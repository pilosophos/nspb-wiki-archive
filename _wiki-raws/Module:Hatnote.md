------------------------------------------------------------------------

-- Module:Hatnote -- -- -- -- This module produces hatnote links and
links to related articles. It -- -- implements the and meta-templates
and includes -- -- helper functions for other Lua hatnote modules. --

------------------------------------------------------------------------

local libraryUtil = require('libraryUtil') local checkType =
libraryUtil.checkType local mArguments -- lazily initialise
[Module:Arguments](Module:Arguments "wikilink") local yesno -- lazily
initialise [Module:Yesno](Module:Yesno "wikilink")

local p = {}

------------------------------------------------------------------------

-- Helper functions

------------------------------------------------------------------------

local function getArgs(frame)

`   -- Fetches the arguments from the parent frame. Whitespace is trimmed and`
`   -- blanks are removed.`
`   mArguments = require('Module:Arguments')`
`   return mArguments.getArgs(frame, {parentOnly = true})`

end

local function removeInitialColon(s)

`   -- Removes the initial colon from a string, if present.`
`   return s:match('^:?(.*)')`

end

function p.findNamespaceId(link, removeColon)

`   -- Finds the namespace id (namespace number) of a link or a pagename. This`
`   -- function will not work if the link is enclosed in double brackets. Colons`
`   -- are trimmed from the start of the link by default. To skip colon`
`   -- trimming, set the removeColon parameter to false.`
`   checkType('findNamespaceId', 1, link, 'string')`
`   checkType('findNamespaceId', 2, removeColon, 'boolean', true)`
`   if removeColon ~= false then`
`       link = removeInitialColon(link)`
`   end`
`   local namespace = link:match('^(.-):')`
`   if namespace then`
`       local nsTable = mw.site.namespaces[namespace]`
`       if nsTable then`
`           return nsTable.id`
`       end`
`   end`
`   return 0`

end

function p.formatPages(...)

`   -- Formats a list of pages using formatLink and returns it as an array. Nil`
`   -- values are not allowed.`
`   local pages = {...}`
`   local ret = {}`
`   for i, page in ipairs(pages) do`
`       ret[i] = p._formatLink(page)`
`   end`
`   return ret`

end

function p.formatPageTables(...)

`   -- Takes a list of page/display tables and returns it as a list of`
`   -- formatted links. Nil values are not allowed.`
`   local pages = {...}`
`   local links = {}`
`   for i, t in ipairs(pages) do`
`       checkType('formatPageTables', i, t, 'table')`
`       local link = t[1]`
`       local display = t[2]`
`       links[i] = p._formatLink(link, display)`
`   end`
`   return links`

end

function p.makeWikitextError(msg, helpLink, addTrackingCategory, title)

`   -- Formats an error message to be returned to wikitext. If`
`   -- addTrackingCategory is not false after being returned from`
`   -- `[`Module:Yesno`](Module:Yesno "wikilink")`, and if we are not on a talk page, a tracking category`
`   -- is added.`
`   checkType('makeWikitextError', 1, msg, 'string')`
`   checkType('makeWikitextError', 2, helpLink, 'string', true)`
`   yesno = require('Module:Yesno')`
`   title = title or mw.title.getCurrentTitle()`
`   -- Make the help link text.`
`   local helpText`
`   if helpLink then`
`       helpText = ' (`[`help`]('_.._helpLink_.._' "wikilink")`)'`
`   else`
`       helpText = ''`
`   end`
`   -- Make the category text.`
`   local category`
`   if not title.isTalkPage and yesno(addTrackingCategory) ~= false then`
`       category = 'Hatnote templates with errors'`
`       category = string.format(`
`           '`[`%s:%s`](%s:%s "wikilink")`',`
`           mw.site.namespaces[14].name,`
`           category`
`       )`
`   else`
`       category = ''`
`   end`
`   return string.format(`
`       '`<strong class="error">`Error: %s%s.`</strong>`%s',`
`       msg,`
`       helpText,`
`       category`
`   )`

end

function p.disambiguate(page, disambiguator)

`   -- Formats a page title with a disambiguation parenthetical,`
`   -- i.e. "Example" → "Example (disambiguation)".`
`   checkType('disambiguate', 1, page, 'string')`
`   checkType('disambiguate', 2, disambiguator, 'string', true)`
`   disambiguator = disambiguator or 'disambiguation'`
`   return string.format('%s (%s)', page, disambiguator)`

end

------------------------------------------------------------------------

-- Format link -- -- Makes a wikilink from the given link and display
values. Links are escaped -- with colons if necessary, and links to
sections are detected and displayed -- with " § " as a separator rather
than the standard MediaWiki "#". Used in -- the template.

------------------------------------------------------------------------

function p.formatLink(frame)

`   local args = getArgs(frame)`
`   local link = args[1]`
`   local display = args[2]`
`   if not link then`
`       return p.makeWikitextError(`
`           'no link specified',`
`           'Template:Format hatnote link#Errors',`
`           args.category`
`       )`
`   end`
`   return p._formatLink(link, display)`

end

function p._formatLink(link, display)

`   checkType('_formatLink', 1, link, 'string')`
`   checkType('_formatLink', 2, display, 'string', true)`

`   -- Remove the initial colon for links where it was specified manually.`
`   link = removeInitialColon(link)`

`   -- Find whether a faux display value has been added with the {{!}} magic`
`   -- word.`
`   if not display then`
`       local prePipe, postPipe = link:match('^(.-)|(.*)$')`
`       link = prePipe or link`
`       display = postPipe`
`   end`

`   -- Find the display value.`
`   if not display then`
`       local page, section = link:match('^(.-)#(.*)$')`
`       if page then`
`           display = page .. ' § ' .. section`
`       end`
`   end`

`   -- Assemble the link.`
`   if display then`
`       return string.format(`
`           '`[`%s`](:%s "wikilink")`',`
`           string.gsub(link, '|(.*)$', ''), --display overwrites manual piping`
`           display`
`       )`
`   else`
`       return string.format('`[`:%s`](:%s "wikilink")`', link)`
`   end`

end

------------------------------------------------------------------------

-- Hatnote -- -- Produces standard hatnote text. Implements the
template.

------------------------------------------------------------------------

function p.hatnote(frame)

`   local args = getArgs(frame)`
`   local s = args[1]`
`   local options = {}`
`   if not s then`
`       return p.makeWikitextError(`
`           'no text specified',`
`           'Template:Hatnote#Errors',`
`           args.category`
`       )`
`   end`
`   options.extraclasses = args.extraclasses`
`   options.selfref = args.selfref`
`   return p._hatnote(s, options)`

end

function p._hatnote(s, options)

`   checkType('_hatnote', 1, s, 'string')`
`   checkType('_hatnote', 2, options, 'table', true)`
`   options = options or {}`
`   local classes = {'hatnote', 'navigation-not-searchable'}`
`   local extraclasses = options.extraclasses`
`   local selfref = options.selfref`
`   if type(extraclasses) == 'string' then`
`       classes[#classes + 1] = extraclasses`
`   end`
`   if selfref then`
`       classes[#classes + 1] = 'selfref'`
`   end`
`   return string.format(`
`       '`

<div role="note" class="%s">

%s

</div>

',

`       table.concat(classes, ' '),`
`       s`
`   )`

end

return p