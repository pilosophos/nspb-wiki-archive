---
title: Tekna
---
The *Tekna* is an organized crime syndicate originating in
[Malaszec](Malaszec "wikilink") involved in a wide variety of criminal
activities, including protection racketeering, smuggling, and extortion.
It originated as a syndicate of smuggling rings in the colonial era of
the former Malaszec Empire, smuggling people and goods to and from
Malaszec's colonies, and continues to operate to this day. The Tekna
became prolific during communist Malaszec, where the flow of goods and
people were significantly restricted and a black market thrived. The
transition from communist to capitalist Malaszec led to the
legitimization of some of its operations; the most well known example is
[Ilasrom](Ilasrom "wikilink"), a municipal services corporation that
split off from the Tekna's black market operations in Astlod. While
based primarily in Malaszec, the Tekna has substantial operations in
foreign countries, such as [Erothena](Erothena "wikilink") and
[Bangsalaya](Bangsalaya "wikilink"). The Tekna is organized into various
chapters, which together form the crime syndicate.

## Etymology

"Tekna" is a Malaszec word which can mean "walker" or "mover," itself
derived by converting "tec" (meaning "to walk") to a noun and adding the
first person suffix "-na". The name likely refers to its origins as a
collective of smuggling rings during Imperial Malaszec, moving people
and goods to and from Malaszec illegally.

## Notable incidents

### Quiet Proj and Operation Loud Money

In 2038 the Tekna created a cryptocurrency called the Quiet Proj in
order to dodge export duties and provide anonymity for Tekna
transactions. The Quiet Proj was thought to have been used for up to 30%
of transactions between the Tekna's chapters operating internationally.
After a drug bust in a Tekna facility in 2046, the Malaszecije
Veklajzdravosposz (MVD, the Malaszec Federal Police) recovered a Quiet
Proj server node and launched Operation Loud Money, which exploited
flaws in the cryptographic coprocessors installed on servers running the
system. By doing this, the MVD were able to forge Quiet Proj, causing
the first known case of hyperinflation in a cryptocurrency and rendering
the Quiet Proj useless.

#### Execution and aftermath of Operation Loud Money

In early 2046, MVD operatives raided a Tekna facility during a drug bust
and discovered a Quiet Proj server node. With physical access, the MVD
learned the frequency of Quiet Proj usage and relative values of
transactions conducted in Quiet Proj, but not the actual value or who
was using it. Inspecting some of the server's logs, a few of the
user-set resource strings of exchanged Quiet Proj explicitly stated that
it was being spent on moving drugs, and Quiet Proj became a higher
priority.

Operation Loud Money was an MVD initiative to render the Quiet Proj
unusable. The MVD crashed the Quiet Proj economy by exploiting
weaknesses in the cryptographic coprocessors used by its RPoW servers,
the most important part of the RPoW system. The servers used Dovreija
Systems PG1064-1 cryptographic coprocessors, which were commonly found
in decommissioned ATMs after the release of the newer PG1064-2. The
PG1064 series contains a variety of security measures including cutting
power to itself if it detects tampering, thereby purging its memory to
prevent leaking sensitive data. However, the PG1064-1's temperature
sensor had a flaw, and could be disabled. Then, by subjecting the
coprocessor's memory chips to temperatures well below freezing, the data
remained for several minutes even when powered off and device's private
key could be extracted.

Dovreija Systems manufactured another PG1064-1 with the given private
key, and with this, the MVD could create a fake RPoW server with a
compromised version of the RPoW server software that could issue forged
Quiet Proj. In effect, printing more money. The MVD deliberately
produced so many forged Quiet Proj that the ensuing hyperinflation
caused it to become worthless.

#### Implementation of the Quiet Proj

Unlike a blockchain, it relied on a Reusable Proof of Work (RPoW)
algorithm, which were first described in a paper from the University of
Serszec in 2032. The paper described an application for the RPoW
algorithm for use in a digital currency system, with RPoW tokens as
currency. It revolved around the fact that a regular Proof of Work (PoW)
token is computationally expensive to generate, but trivial to verify
the integrity of. Just as gold is valuable due to its rarity labour
required to extract, a PoW token is valuable due to the time and
computational power it takes to create. An RPoW server exchanges PoW
tokens for RPoW tokens of equivalent value. An RPoW token is embedded
with a resource string, typically a transaction ID that is kept by the
recipient. An RPoW token can be exchanged by an RPoW server for either
another token of equivalent value or several tokens adding up to the
same value with different resource strings.

The RPoW system was designed to be impervious to tampering even by the
owner of the system, and is supposed to be run on cryptographic hardware
supporting remote attestation, which allows the hardware to prove it was
running software that was not tampered with or altered in any way.
Interested parties could verify that an RPoW token was produced by the
correct version of the RPoW server software, and this proof was
digitally signed by the hardware with a private key that never leaves
the hardware. Given sufficiently secure cryptographic hardware, this
system is hypothetically impervious to forgery.