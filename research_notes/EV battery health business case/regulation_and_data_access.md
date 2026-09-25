# Regulatory drivers and data-access/legal barriers for an independent EV battery SoH assessment business in the EU (status: late September 2026)

> Researcher note on method and reliability: The session's web-fetch tool was blocked by the egress proxy for almost every domain (EUR-Lex, Commission sites, Taylor Wessing, Bird & Bird, Noerr, Lexology, HORIBA, thebatterypass.eu, etc.). Most findings below come from search-result summaries, which are less reliable than full reads. The exception is the Battery Pass consortium's own documents. I read their full text from the consortium's public GitHub repository: the 2023 Content Guidance PDF, the DIN DKE SPEC 99100:2025-02 PDF and the data-model files. Those documents quote the Battery Regulation text directly. Items that rest only on a page title or a search snippet are marked as such. Luxembourg applies EU regulations directly, so everything below applies there without national transposition. Luxembourg-specific enforcement authorities were not researched.

---

## 1. EU Battery Regulation (EU) 2023/1542: battery passport, SoH data, Article 14 BMS access, Annex XIII "legitimate interest", repurposing, and implementation status in 2025–2026

### Takeaway
The Battery Regulation is the strongest EU-level driver and legal hook for an independent SoH business.
- **Article 14 (in force since 18 Aug 2024):** it already requires EV batteries' BMS to hold up-to-date SoH data. For EV batteries, Annex VII defines that SoH parameter as a single figure: the state of certified energy (SOCE, based on UN GTR 22). Article 14 also grants read-only, non-discriminatory access to anyone who legally purchased the battery, or a third party acting on their behalf, for purposes that include "evaluating the residual value."
- **Battery passport (from 18 Feb 2027):** it puts per-battery SoH/SOCE and usage data behind a "persons with a legitimate interest" wall.
- **Missed deadline:** the implementing act that defines who counts as having a legitimate interest (Art. 77(9)) was due 18 Aug 2026 and has not been adopted. The Commission now reportedly targets Q4 2026. The 18 Feb 2027 passport date itself has not been moved.

### Cited Findings
**Timeline / status**
- The battery passport becomes mandatory from **18 February 2027** for LMT batteries, industrial batteries >2 kWh and EV batteries. It is accessed via a QR code. — [Automotive IQ](https://www.automotive-iq.com/electrics-electronics/articles/eu-battery-passport-explained-requirements-timeline-and-compliance-steps-to-2027); [OpenDPP](https://opendpp-node.eu/battery-passport)
- The 2025 "Omnibus IV" simplification (**Regulation (EU) 2025/1561**) postponed the battery due-diligence obligations from 18 Aug 2025 to **18 Aug 2027**. It did **not** move the battery-passport date. — [ASUENE](https://asuene.com/us/blog/eu-battery-regulation-2027-executive-readiness-for-carbon-footprint-battery-passport-and-due-diligence); [Automotive IQ](https://www.automotive-iq.com/electrics-electronics/articles/eu-battery-passport-explained-requirements-timeline-and-compliance-steps-to-2027)
- The Commission was legally required to adopt, by **18 August 2026**, the act defining who may access non-public battery-passport data. It did not do so. Its own timetable reportedly places the act in **Q4 2026**. — [Battery-Tech Network](https://battery-tech.net/why-the-eu-is-about-to-miss-its-own-battery-passport-deadline-while-industrys-stays-fixed/) (search snippet); [Taylor Wessing, Aug 2026: "Battery passport: access rules not adopted by 18 August 2026 – What the missing implementing act under Article 77 Para. 9 … means for companies"](https://www.taylorwessing.com/en/insights-and-events/insights/2026/08/battery-passport) (title only; page blocked); [eudigitalproductpassport.org: "the Article 77(9) implementing act missed its 18 August 2026 deadline"](https://eudigitalproductpassport.org/updates/battery-passport-access-rights-implementing-act-delay) (title only)
  - Sources disagree on the instrument type. Automotive IQ calls it a "delegated act" due by 18 Aug 2026. Taylor Wessing and the Battery Pass consortium call it an **implementing act under Art. 77(9)**. — [Automotive IQ](https://www.automotive-iq.com/electrics-electronics/articles/eu-battery-passport-explained-requirements-timeline-and-compliance-steps-to-2027); [Battery Pass Content Guidance, p. 34](https://github.com/batterypass/BatteryPassDataModel/blob/main/docs/1.2/2023_Battery_Passport_Content_Guidance.pdf)
- A CMS Nov 2025 alert ("EU Sustainable Batteries Regulation: Where are we now?") tracks implementation status. Its content could not be retrieved. — [CMS Law-Now](https://cms-lawnow.com/en/ealerts/2025/11/eu-sustainable-batteries-regulation-where-are-we-now)

**Article 14: BMS data and third-party read-only access**
- Article 14 requires EV batteries (plus stationary storage and LMT batteries) to contain a BMS that stores the data needed to determine **state of health and expected lifetime** per **Annex VII**. — [Circuland](https://circuland.co.uk/en/resources/eu-battery-regulation-2023-1542); [UL Solutions](https://www.ul.com/insights/industry-insights-eu-battery-regulation-20231542)
- The Battery Pass consortium quotes Article 14: "up to date data for the parameters for determining the state of health and expected lifetime of batteries as set out in Annex VII shall be contained in the battery management system of stationary battery energy storage systems, LMT batteries and electric vehicle batteries." This applies from **18 August 2024**. — [Battery Pass Content Guidance, p. 160](https://github.com/batterypass/BatteryPassDataModel/blob/main/docs/1.2/2023_Battery_Passport_Content_Guidance.pdf)
- "Up to date" is specified in **Recital 46** as "updated at least daily and more frequently where that is required for a specific purpose." — [Battery Pass Content Guidance, pp. 160–161](https://github.com/batterypass/BatteryPassDataModel/blob/main/docs/1.2/2023_Battery_Passport_Content_Guidance.pdf)
- **Article 14(2)** requires **read-only access** to that BMS data. Terms:
  - Access must be on a **non-discriminatory basis** and must respect the manufacturer's IP rights.
  - Access goes to "the natural or legal person who has legally purchased the battery, including independent operators … or any third party acting on their behalf."
  - The purposes are: (a) making the battery available to independent aggregators or energy-market participants; (b) **evaluating the residual value or remaining lifetime and capability for further use**; (c) facilitating preparation for re-use, repurposing or remanufacturing.
  - — [Circuland](https://circuland.co.uk/en/resources/eu-battery-regulation-2023-1542) / [UL Solutions](https://www.ul.com/insights/industry-insights-eu-battery-regulation-20231542) (search summary; the Article 14(2) wording was not read directly)
- The Regulation defines **"independent operator"** (Art. 3(1)(23)) as a person independent from the manufacturer and producer who is "directly or indirectly involved in the repair, maintenance or repurposing of batteries." The definition expressly includes "**operators offering inspection and testing services**." — [Battery Pass Content Guidance, glossary p. ~20](https://github.com/batterypass/BatteryPassDataModel/blob/main/docs/1.2/2023_Battery_Passport_Content_Guidance.pdf)

**What "SoH" legally means for EV batteries (Annex VII)**
- Annex VII, as reproduced by the Battery Pass consortium, lists **only one SoH parameter for EV batteries: "1. State of certified energy (SOCE)."**
  - Stationary storage and LMT batteries instead list: remaining capacity, remaining power capability (where possible), remaining round-trip efficiency (where possible), evolution of self-discharge, and Ohmic resistance (where possible).
  - The expected-lifetime parameters are: date of manufacture and date of putting into service, energy throughput, capacity throughput, harmful events (deep discharges, time at extreme temperatures, charging at extreme temperatures), and number of full cycles.
  - — [Battery Pass Content Guidance, p. 157](https://github.com/batterypass/BatteryPassDataModel/blob/main/docs/1.2/2023_Battery_Passport_Content_Guidance.pdf)
- DIN DKE SPEC 99100:2025-02 (§6.7.2.7):
  - "As per BattReg Annex VII, Part A the SoH for EV batteries is defined as the state of certified energy (SOCE)."
  - The passport for EV batteries using a BMS "must include information on the SOCE … pursuant to BattReg Article 14 for individual batteries."
  - SOCE "shall be dynamic," "must be accessible to persons with a legitimate interest," and "shall be reported based on the conditions laid out in the UN GTR No 22."
  - NOTE 1 says SOCE reporting is "also required by … Euro 7."
  - — [DIN DKE SPEC 99100 (copy in Battery Pass repo)](https://github.com/batterypass/BatteryPassDataModel/blob/main/docs/1.2/DIN_DKE_SPEC_99100.pdf)
- SOCE is defined (from GTR 22) as "the measured or on-board usable battery energy performance at a specific point in its lifetime, expressed as a percentage of the certified usable battery energy." — [Battery Pass data model, PerformanceAndDurability.ttl v1.2.1](https://github.com/batterypass/BatteryPassDataModel/blob/main/BatteryPass/io.BatteryPass.Performance/1.2.1/PerformanceAndDurability.ttl)
- The Regulation's general SoH definition (Art. 3) is "a measure of the general condition of a rechargeable battery and its ability to deliver the specified performance compared with its initial condition."
  - The consortium notes that "SOCE is vehicle-type specific," whereas capacity fade (required for all passport batteries) gives a value comparable across categories.
  - It also notes that SoH may additionally refer to resistance and is safety-relevant.
  - — [Battery Pass Content Guidance, p. 163](https://github.com/batterypass/BatteryPassDataModel/blob/main/docs/1.2/2023_Battery_Passport_Content_Guidance.pdf)
- The Battery Regulation left minimum durability requirements for EV batteries to Euro 7: "Minimum requirements for EV batteries will be laid down in the upcoming Euro 7 legislation." — [Battery Pass Content Guidance, p. 158](https://github.com/batterypass/BatteryPassDataModel/blob/main/docs/1.2/2023_Battery_Passport_Content_Guidance.pdf)
- Separately, Article 10 requires EV batteries to be accompanied (from 18 Aug 2024) by a document with electrochemical performance and durability values under Annex IV Part A. The consortium says this information "will thus be available for any holder of the battery." — [Battery Pass Content Guidance, p. 160](https://github.com/batterypass/BatteryPassDataModel/blob/main/docs/1.2/2023_Battery_Passport_Content_Guidance.pdf)

**Annex XIII access tiers**
- Annex XIII has four access tiers:
  - **Point 1 (public):** model-level information such as rated capacity, round-trip efficiency and internal resistance.
  - **Point 2 (persons with a legitimate interest and the Commission):** detailed composition, part numbers and spare-parts sources, dismantling information, safety measures.
  - **Point 3 (notified bodies, market-surveillance authorities, Commission):** compliance test reports.
  - **Point 4 (persons with a legitimate interest), individual battery:** (a) Art. 10 performance and durability parameters; **(b) state-of-health information under Article 14**; (c) battery status; (d) "information and data as result of its use" (cycles, negative events such as accidents, temperature, state of charge).
  - — [Battery Pass Content Guidance, p. 156 (Annex XIII diagram)](https://github.com/batterypass/BatteryPassDataModel/blob/main/docs/1.2/2023_Battery_Passport_Content_Guidance.pdf); [open-dpp issue #821](https://github.com/open-dpp/open-dpp/issues/821)
- "Person with a legitimate interest" is defined only as "any natural or legal person with a legitimate interest in accessing and processing battery passport information" (Art. 77(2)). The Commission must specify this group by implementing act.
  - Under Art. 77(2) and (9), two use cases must be assessed: (i) to "evaluate the status and **residual value** of the battery and its capability for further use"; (ii) "preparation for re-use, preparation for repurposing, repurposing, remanufacturing or recycling … or for choosing between those activities."
  - Access to commercially sensitive information must be "limited to the minimum necessary" (Art. 77(9)).
  - — [Battery Pass Content Guidance, p. 34](https://github.com/batterypass/BatteryPassDataModel/blob/main/docs/1.2/2023_Battery_Passport_Content_Guidance.pdf)
- Secondary sources summarise the legitimate-interest group as covering independent repairers, remanufacturers, second-life operators, recyclers and energy-aggregator use. They say that group can see SoH, cycle history, temperature records and status. — [Nulara / OpenDPP / Fluxy (search summary)](https://opendpp-node.eu/battery-passport); [productpasses.com](https://productpasses.com/blog/battery-passport-access-rights-2026)

**Repurposing / second life and passport editing**
- Battery status in the passport is chosen from 'original', 'repurposed', 'reused', 'remanufactured', 'waste' (Annex XIII 4(c)). — [Battery Pass data model](https://github.com/batterypass/BatteryPassDataModel)
- Battery Pass consortium view on who may edit the passport:
  - Unauthorised independent operators may **not change existing passport data**. Where an unauthorised operator adds data (e.g., after a module replacement), responsibility for that data should transfer to that operator.
  - "Trusted third parties such as TÜV in Germany could be authorised by the responsible economic operator to check the information included."
  - Responsibility stays with the economic operator placing the battery on the market (Recital 125).
  - — [Battery Pass Content Guidance, p. 55](https://github.com/batterypass/BatteryPassDataModel/blob/main/docs/1.2/2023_Battery_Passport_Content_Guidance.pdf)
- The data-attribute standard for the passport is **DIN DKE SPEC 99100:2025-02**. The Battery Pass project ended in April 2025; the follow-up is "BatteryPass-Ready." — [Battery Pass data model README](https://github.com/batterypass/BatteryPassDataModel)

### Inferences
- **Legal access is strongest today under Article 14(2).** It has applied since 18 Aug 2024, its purpose list explicitly covers residual-value evaluation, and it covers third parties acting on the purchaser's behalf. The main open issues are the practical interface: *how* read-only access is provided (OBD, OEM cloud, app), at what cost, and whether "legally purchased" covers leased vehicles, where the lessor rather than the driver is the purchaser. No implementing detail on the access modality was found.
- **The legal SoH metric for EVs is the OEM-computed on-board SOCE,** not an independent measurement. A third-party certificate will therefore compete with, or build on, a regulated OEM figure. The added value lies in (a) independent verification of the OEM SOCE (GTR 22 permits monitor error of about 5 points; see §3), (b) richer diagnostics (cell imbalance, resistance, usage history), and (c) coverage of pre-Euro 7 and pre-2027 vehicles, which have no passport or certified SOCE monitor.
- The battery passport applies only to batteries **placed on the market from 18 Feb 2027**. The used-EV fleet on the road in 2026–2030 will largely have no passport, which sustains demand for independent assessment in that window.
- Because the Art. 77(9) act slipped past 18 Aug 2026, independent assessors have no legal certainty yet that they qualify as "persons with a legitimate interest." This is a key watch item for Q4 2026–Q1 2027.

### Gaps
- The full text of Article 14(2)–(3) was not retrieved (EUR-Lex blocked). Unknown: exact wording on the access mode (e.g., whether an OBD port is required), whether it covers lessees, and whether OEMs may charge.
- No draft text or leaked content of the Art. 77(9) implementing act was found, so it is unknown whether "inspection and testing services" or used-car buyers/valuers will be named as legitimate-interest persons.
- It is unclear whether any 2026 omnibus proposal (e.g., the environmental omnibus) touches Art. 14 or Art. 77. None was found, but searches were limited.
- The Commission's electronic battery-passport exchange system and the technical implementing acts under Art. 78 were not verified.

---

## 2. Euro 7 (Regulation (EU) 2024/1257): battery durability MPRs, SOCE/SOCR monitors, dates, OBD readability

### Takeaway
Euro 7 makes minimum battery durability a type-approval requirement for M1 cars: SOCE of **at least 80% at 5 years/100,000 km and at least 72% at 8 years/160,000 km**. It also requires on-board SOCE/SOCR monitors whose values must be accessible to users via the OBD port or over the air. It applies to new M1/N1 types from **29 Nov 2026** and to all new registrations from **29 Nov 2027**. A Dec 2025 "automotive omnibus" proposal is amending parts of Euro 7, including battery durability; its final content is still in the legislative process.

### Cited Findings
- **M1 battery durability:** EV batteries must retain at least **80%** of energy capability after **5 years or 100,000 km** (whichever is sooner) and at least **72%** after **8 years or 160,000 km**. This is the first time European emission standards include battery-durability MPRs. — [Electric Car Scheme](https://www.electriccarscheme.com/advice/salary-sacrifice-resource-hub/euro-7-emissions-standards-electric-cars-fleet-managers); [IDIADA](https://www.digitalsolutions.applusidiada.com/blogs/news/eu-publishes-new-euro-7-regulation-for-vehicle-emissions-and-battery-durability); [Sustainability in Business blog](https://www.sustainabilityinbusiness.blog/2026/02/the-eu-automotive-omnibus-simplifying-vehicle-regulation-as-part-of-the-clean-mobility-transition/)
- **Dates:** new types of N1 from **29 Nov 2026**, all new N1 from **29 Nov 2027** ([Global Policy Watch / Euro 7 summary search](https://www.globalpolicywatch.com/2026/01/the-eu-automotive-package-increased-compliance-flexibility-but-growing-made-in-the-eu-conditionality/)). The On-Board Monitor (OBM) is required for newly type-approved M1 from **29 Nov 2026** and all newly registered M1 from **29 Nov 2027** ([Medium/Xeeniq summary](https://medium.com/@xeeniq/euro-7-created-a-new-team-the-obm-obfcm-data-team-348191b03023)). The Commission's official Euro 7 summary is at [EUR-Lex summary](https://eur-lex.europa.eu/EN/legal-content/summary/vehicle-emissions-and-battery-durability-euro-7-technical-requirements-and-certification-rules.html) (not fetched).
- **Monitors:** for electrified powertrains, **SOCE and SOCR** are added to the OBM's monitoring scope. "Vehicle manufacturers must make both SOCE and SOCR values accessible to users, either through the On-Board Diagnostics (OBD) port or via Over-the-Air (OTA) updates." — [HORIBA GTR 22 page (search summary)](https://www.horiba.com/usa/mobility/applications/emissions-performance-and-durability/exhaust-emissions/gtr-no22/); [Automotive IQ (search summary)](https://www.automotive-iq.com/chassis-systems/how-to-guides/meeting-euro-7-regulations)
- A **2025 Euro 7 implementing act** defines "OBM data" to include battery-durability data. It requires traction-battery SoH monitors, requires that environmental and vehicle-performance data be made available to users, and requires OBM systems to communicate battery-durability data **via the OBD port** and anonymously over the air for compliance monitoring. — [Medium/Xeeniq (secondary; search summary)](https://medium.com/@xeeniq/euro-7-created-a-new-team-the-obm-obfcm-data-team-348191b03023); implementing regulation listed as [Commission Implementing Regulation (EU) 2025/1707 on EUR-Lex](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32025R1707) (not fetched; title and exact scope unverified)
- **Automotive omnibus:**
  - Presented **16 Dec 2025** as part of the Automotive Package, it simplifies vehicle rules. Its amendments address general safety, occupant and VRU protection, emissions requirements **and battery durability**. — [Sustainability in Business blog](https://www.sustainabilityinbusiness.blog/2026/02/the-eu-automotive-omnibus-simplifying-vehicle-regulation-as-part-of-the-clean-mobility-transition/); [Global Policy Watch](https://www.globalpolicywatch.com/2026/01/the-eu-automotive-package-increased-compliance-flexibility-but-growing-made-in-the-eu-conditionality/)
  - As of **14 Apr 2026** the European Parliament Research Service listed it as "EU legislation in progress." — [EPRS "EU automotive omnibus"](https://epthinktank.eu/2026/04/14/eu-automotive-omnibus-eu-legislation-in-progress/) (title/snippet only)

### Inferences
- **From Nov 2026–Nov 2027, every new EU car will carry a regulated SOCE figure readable via OBD or OTA.** This is a double-edged driver:
  - For: it legitimises SoH as a consumer-relevant, standardised metric, which supports demand for SoH-based pricing in used-car and leasing markets.
  - Against: it commoditises the basic SoH readout, since anyone with OBD access may read SOCE. It also makes independent assessment of older (pre-Euro 7) cars, and verification of OEM values, the more defensible niche.
- The requirement is "accessible to users," not explicitly "accessible to independent operators." Third-party access then depends on 2018/858 OBD rules (§5) and on the user sharing the data (Data Act, §4).

### Gaps
- The N1 (van) MPR values could not be verified in any retrieved source. Secondary commentary commonly cites 75%/67%; treat as unverified.
- The exact Euro 7 article and annex numbers for the battery-durability MPRs and the SOCE-monitor accuracy/OBD PID requirements were not verified (EUR-Lex blocked).
- It is unknown whether the Dec 2025 automotive omnibus changes the battery-durability MPRs, the dates or the monitor obligations. It is described only as "addressing" battery durability, and its content and trilogue status as of Sept 2026 were not found.
- It is unclear whether the SOCE PID will be standardised (e.g., SAE J1979-2 / ISO 15031) and readable by generic scan tools without OEM authentication. The UNECE EVE-97 "GTR22 Standardization Activities – SOCE Readiness" document ([UNECE wiki](https://wiki.unece.org/download/attachments/367624574/EVE-97-04e%20-%20UN%20GTR%2022%20SOCE%20Readiness.pdf?api=v2)) likely covers this but could not be read.

---

## 3. UNECE GTR No. 22 (in-vehicle battery durability) and GTR No. 21

### Takeaway
GTR 22 is the global technical basis both for Euro 7's battery MPRs and for the Battery Regulation's EV SoH parameter. It defines SOCE (usable energy as a % of certified usable energy) and SOCR (range as a % of certified range). It requires on-board monitors, with an accuracy tolerance of about 5 percentage points verified for SOCE; SOCR accuracy is not yet set. GTR 21 was not confirmed as relevant to SoH.

### Cited Findings
- **Definitions:** SOCE measures the percentage of usable battery energy retained as the battery ages. SOCR measures the percentage of original certified driving range remaining. Manufacturers must make both accessible to users (OBD or OTA). — [HORIBA GTR 22 (search summary)](https://www.horiba.com/usa/mobility/applications/emissions-performance-and-durability/exhaust-emissions/gtr-no22/)
- **Monitor accuracy:** GTR 22 uses a 5% difference threshold ("Difference A = 5%") for evaluating monitors. "As at the current stage no accuracy requirements are set for the SOCR monitor"; separate SOCR statistics will be calculated "once accuracy requirements are set for Part A in a future amendment." — [MDPI Batteries 9(9):454 "Experimental Application of the GTR on In-Vehicle Battery Durability" / UNECE EVE documents (search summary)](https://www.mdpi.com/2313-0105/9/9/454)
- GTR 22 **Amendment 1** was published in the UN Global Registry (ECE/TRANS/180/Add.22/Amend.1, Oct 2024). — [UNECE](https://unece.org/sites/default/files/2024-10/ECE-TRANS-180-Add.22-Amend1_updated.pdf) (not fetched)
- **GTR 22 end-of-life SOCE thresholds**, as reported in an ACEA/Battery Regulation context: "equal to 70% for category 1 vehicles and equal to 65% for category 2 vehicles." ACEA argued that battery-data access should be limited to the GTR indicators SOCE (or capacity fade) and SOCR. — [ACEA position paper, Oct 2021](https://www.acea.auto/files/ACEA_position_paper-EU-Batteries-Regulation.pdf) (search snippet)
- The US EPA has integrated GTR 22 into its light- and medium-duty regulations (UNECE EVE-61 presentation). — [UNECE wiki EVE-61-07e](https://wiki.unece.org/download/attachments/192840855/EVE-61-07e%20-%20GTR%2022%20US%20regulation%20integration%20overview.pdf?api=v2) (title/snippet)
- The Battery Pass consortium adds GTR 22-based attributes to the passport: "certified usable battery energy" (static) and "remaining usable battery energy" (dynamic). It notes these are "applicable only to EV batteries due to vehicle-based testing requirements." — [Battery Pass Content Guidance, pp. 164–165](https://github.com/batterypass/BatteryPassDataModel/blob/main/docs/1.2/2023_Battery_Passport_Content_Guidance.pdf)

### Inferences
- Euro 7's 8-year threshold (72%) is stricter than the GTR 22 category 1 value cited by ACEA (70%). The EU has therefore tightened the GTR baseline.
- A tolerance of about 5 points on the on-board SOCE monitor is a material gap for used-car pricing. On a 60 kWh pack it amounts to roughly 3 kWh, or about 15–20 km of range. That creates room for an independent, test-based verification service.

### Gaps
- The exact GTR 22 accuracy statistic (e.g., percentile-based pass criteria) and its SOCE MPR Part A/Part B structure were not verified from primary text.
- **GTR No. 21:** no source was retrieved. From background knowledge it concerns determination of electrified-vehicle power (DEVP) rather than battery health; this is unverified in this session.
- The WP.29 adoption date of the original GTR 22 was not verified.

---

## 4. EU Data Act (Regulation (EU) 2023/2854): user access and sharing of connected-vehicle data; limits; status of sector-specific in-vehicle data legislation

### Takeaway
Since **12 Sept 2025** the Data Act lets a vehicle user obtain, and direct to a third party such as an SoH assessor, the "readily available" raw and pre-processed data a connected car generates. Commission vehicle-data guidance (15 Sept 2025) excludes "inferred or derived" data. That creates a real risk that OEMs classify their computed SoH value as derived and therefore out of scope, while raw cell voltages, currents and temperatures stay in scope. The long-promised automotive-specific in-vehicle data access law has still not been proposed: it was stalled through the 2024 elections, and no 2025–2026 proposal was found.

### Cited Findings
- **Dates:** Chapter II (B2C/B2B data sharing) applies from **Sept 2025**. The Art. 3 access-by-design obligation applies from **Sept 2026**. Chapter IV (unfair contractual terms) for existing contracts applies from **Sept 2027**. — [Grape Up](https://grapeup.com/blog/unveiling-the-eu-data-act-automotive-industry-implications) (search summary). The Data Act "came into force on 12 September 2025." — [Grape Up](https://grapeup.com/blog/eu-data-act-vehicle-guidance-2025-what-automotive-oems-must-share-by-september-2026)
- **Commission guidance:** "Guidance on vehicle data, accompanying the Data Act" was published **15 Sept 2025**. It explains obligations on access to, use and transmission of connected-vehicle data. — [European Commission, Shaping Europe's digital future](https://digital-strategy.ec.europa.eu/en/library/guidance-vehicle-data-accompanying-data-act); [EUR-Lex OJ C 2025/5026 PDF](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX%3A52025XC05026) (not fetched)
- **Scope:**
  - Data holders must grant access to **"raw" and "pre-processed" data** plus the metadata needed to interpret it. **"Information inferred or derived from such data" is out of scope.**
  - Pre-processed data has undergone normalisation, filtering or aggregation "without altering their descriptive nature of the vehicle's state or functioning" (e.g., corrected temperature, speed, fuel level, GPS tracking).
  - Derived data results from "complex processing, often based on proprietary algorithms," which generates new content, e.g., ADAS object classification or eco-driving scores.
  - — [Bird & Bird](https://www.twobirds.com/en/insights/2025/navigating-the-data-act-eu-commission-guidance-for-the-automotive-sector); [Garrigues](https://www.garrigues.com/en_GB/garrigues-digital/new-guidance-vehicle-data-and-data-act-challenges-and-opportunities) (search summaries)
- Raw sensor data such as tyre pressure, speed or **battery charge readings** are cited as examples of readily available data that must be shared on request. — [Grape Up](https://grapeup.com/blog/eu-data-act-vehicle-guidance-2025-what-automotive-oems-must-share-by-september-2026) (secondary)
- Data must be delivered "of the same quality as is available to the data holder," without unnecessary obstacles, costs or procedural hurdles. — [Grape Up / Garrigues (search summary)](https://www.garrigues.com/en_GB/garrigues-digital/new-guidance-vehicle-data-and-data-act-challenges-and-opportunities)
- **Cost:** direct access for the user is free. B2B sharing with a third party can be charged at "reasonable compensation." — [Grape Up](https://grapeup.com/blog/unveiling-the-eu-data-act-automotive-industry-implications)
- French industry body PFA published an "Automotive Sector Guide – Data Act" (V4, 23 Jun 2025). — [PFA](https://pfa-auto.fr/wp-content/uploads/2024/10/Automotive-Sector-Guide-Data-Act-V4-23062025.pdf) (not read)
- Taylor Wessing published "FAQ: Access to Vehicle Data and Data Governance – EU Regulatory Frameworks and Practical Guidance" (Jan 2026). — [Taylor Wessing](https://www.taylorwessing.com/en/insights-and-events/insights/2026/01/faq-access-to-vehicle-data-and-data-governance) (title only; blocked)
- **Background provisions** (from the Data Act text; not re-verified this session because EUR-Lex was blocked) — [Regulation (EU) 2023/2854](https://eur-lex.europa.eu/eli/reg/2023/2854/oj):
  - Art. 4: user access.
  - Art. 5: sharing with a third party at the user's request.
  - Art. 4(6)–(8) and 5(9)–(11): trade-secret safeguards. These allow the data holder to require confidentiality measures and, in exceptional cases, to refuse where serious economic damage is highly likely.
  - Art. 5(3): designated gatekeepers under the DMA cannot be third-party recipients.
  - Art. 6: the third party may use data only for the agreed purpose and may not use it to develop a competing product.
  - Art. 1(5): the GDPR prevails where personal data is involved.

**Sector-specific in-vehicle data legislation**
- The draft proposal received a favourable Regulatory Scrutiny Board opinion but "remains stalled." The 2024 European elections delayed it. — [FIA Region I](https://www.fiaregion1.com/final-call-on-access-to-car-data-this-legislative-term/); [AFCAR](https://www.afcar.eu/access-to-in-vehicle-data-and-resources)
- In **Oct 2024** AFCAR asked President von der Leyen to prioritise a vehicle-data framework within the first 100 days of the new Commission. — [AFCAR / ABPA](https://www.autobpa.com/2024/10/17/european-automotive-aftermarket-calls-for-urgent-action-on-in-vehicle-access/)
- FIA-commissioned research estimates that, without a level playing field, losses to the independent aftermarket and consumers would reach **€26bn/yr by 2030 and €95bn by 2050**. FIA Region I proposes an independent, neutral administrator for in-vehicle data access. — [FIA Region I](https://www.fiaregion1.com/creating-a-level-playing-field-for-vehicle-data-access-time-for-an-ambitious-legislation/) (search summary)
- The Commission's initiative page "Access to vehicle data, functions and resources" (initiative 13180) exists. — [Have Your Say](https://ec.europa.eu/info/law/better-regulation/have-your-say/initiatives/13180-Access-to-vehicle-data-functions-and-resources_en)

### Inferences
- **The Data Act is a usable but incomplete channel.** A vehicle owner or lessee can instruct the OEM to send an SoH service provider raw BMS and telematics data (voltages, temperatures, charge events, possibly SOCE if the OEM treats it as pre-processed).
- **But the OEM controls the interface, timing and format.** B2B requests can be charged, and OEMs can argue that their SoH estimate is "derived" and out of scope. Independent SoH firms should therefore plan to compute their own SoH from raw or pre-processed data rather than rely on receiving the OEM's figure.
- The "direct to third party via OEM cloud" route keeps OEMs as gatekeepers. The aftermarket's goal of direct, real-time in-vehicle access (the sector-specific law) remained unmet as of Sept 2026, as far as found.
- For the business case, B2B Data Act requests carry "reasonable compensation" costs that should be modelled per vehicle.

### Gaps
- No evidence was found of a Commission proposal for sector-specific in-vehicle data access in 2025–2026. It is unclear whether it was formally dropped, folded into the Dec 2025 Automotive Package or the Digital Omnibus, or simply not scheduled.
- It is unclear whether the Nov 2025 "Digital Omnibus" amended the Data Act's trade-secret or B2B provisions (search budget exhausted before this could be checked).
- The guidance's treatment of battery SoH specifically (raw vs pre-processed vs derived) was not found in the retrieved snippets.
- Luxembourg's designated Data Act competent authority and any enforcement actions against OEMs are unknown.

---

## 5. Right to repair / type-approval (Regulation (EU) 2018/858): RMI and OBD access, secure gateways (Stellantis SGW, etc.)

### Takeaway
Regulation 2018/858 (Art. 61 ff. + Annex X) gives "independent operators" unrestricted, standardised, non-discriminatory access to OBD and repair and maintenance information (RMI). The CJEU's *Carglass/ATU v FCA Italy* ruling (C-296/22, 5 Oct 2023) held that OEMs cannot impose conditions beyond those in 2018/858, such as mandatory server registration, on OBD access. The Commission has since adopted **Delegated Regulation (EU) 2026/699**, which rewrites Annex X to specify which security measures, including secure gateways, OEMs may lawfully apply. In practice, SGWs (e.g., Stellantis via AutoAuth) still require registered, authenticated tools, and security-related functions require SERMI accreditation.

### Cited Findings
- Independent operators rely on **Art. 61 ff. and Annex X of 2018/858** to claim unrestricted, standardised and non-discriminatory access to OBD information and RMI. — [Noerr](https://www.noerr.com/en/insights/delegated-regulation-sets-out-new-guidelines-for-secure-gateways-obd-access-and-rmi) (search summary)
- **CJEU C-296/22 (5 Oct 2023):**
  - OEMs may not make access to OBD information subject to conditions other than those in 2018/858.
  - The case arose from Stellantis/FCA Italy requiring ATU and Carglass to register with and log into a fee-based Stellantis server to perform OBD diagnostics.
  - Morgan Lewis summarises that "both read and write access to the direct vehicle data stream via … OBD ports must be granted by law to independent vehicle repairers."
  - — [Morgan Lewis](https://www.morganlewis.com/pubs/2023/12/european-court-of-justice-facilitates-access-to-vehicle-data-for-independent-vehicle-repairers); [Noerr](https://www.noerr.com/en/insights/delegated-regulation-sets-out-new-guidelines-for-secure-gateways-obd-access-and-rmi)
- **Delegated Regulation (EU) 2026/699** "fundamentally reshapes Annex X." For the first time it sets out which security measures are permissible when accessing OBD information and "where those measures cross the line into unlawful restrictions." Its stated rationale is that existing law prevented OEMs from applying effective cyber-protection measures. — [Noerr, "Developments following the ECJ's decision in the Carglass case: Delegated Regulation (EU) 2026/699…"](https://www.noerr.com/en/insights/delegated-regulation-sets-out-new-guidelines-for-secure-gateways-obd-access-and-rmi) (search summary). A related Commission draft (C(2026)1811) and Council document ST-7952-2026 appear on EUR-Lex/Consilium. — [EUR-Lex PI_COM C(2026)1811](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=PI_COM%3AC%282026%291811); [Council ST 7952 2026](https://data.consilium.europa.eu/doc/document/ST-7952-2026-INIT/en/pdf) (not fetched). See also [IGARR, Nov 2025](https://igarr.com/2025/11/07/eu-updates-on-access-to-vehicle-on-board-diagnostics-obd-requirements/).
- **Secure gateway mechanics:** in FCA/Stellantis models the SGW is a gatekeeper between the OBD port and the ECUs. It filters UDS communications and authorises only commands from certified tools. **AutoAuth** is a third-party authentication service that lets aftermarket tools perform secured functions. — [ADS-Pro "AutoAuth FCA and SGW Stellantis: Complete Guide 2026"](https://ads-pro.it/en/autoauth-fca-and-sgw-stellantis-complete-guide-2026/); [Autel](https://autel.us/security-gateways/)
- **SERMI** is the EU accreditation, approval and authorisation scheme for access to security-related RMI by independent operators and their employees. SERMI acts as scheme owner to the European co-operation for Accreditation (EA). — [SERMI](https://www.vehiclesermi.eu/); [Digidentity SERMI](https://www.digidentity.eu/products/sermi)
- A German workshop blog documents independent garages failing at vehicles because of security gateways. — [kfz-dietrich.com](https://kfz-dietrich.com/blog/security-gateway-zugang-freie-werkstatt/) (anecdotal)

### Inferences
- **An SoH assessor is likely an "independent operator" under both regimes.** Under 2018/858 the definition includes publishers of technical information and diagnostic tool makers, and similar categories. Under the Battery Regulation Art. 3(1)(23) it includes "operators offering inspection and testing services." That gives a legal footing to demand OBD access.
- **Reading SOCE and BMS values is typically a read-only diagnostic function.** Under 2026/699 it is likely to require at most tool/user authentication (e.g., AutoAuth-type registration) rather than SERMI. Brand-by-brand SGW onboarding (Stellantis, VW group SFD, Mercedes, Renault, etc.) remains an operational cost and friction point.
- Access through the OBD port requires physical presence, which implies a workshop, mobile-tester or dealer-partner model. Remote SoH at scale depends on the Data Act or OEM telematics APIs.

### Gaps
- The Delegated Regulation 2026/699 publication date, application date, specific permitted measures (authentication, logging, online connectivity, fees) and whether it distinguishes read from write access could not be retrieved.
- OEM-specific gateway regimes (VW SFD, Mercedes, Renault, Tesla) were not researched beyond Stellantis.
- It is unclear whether the Euro 7 SOCE PID must be readable without SGW authentication.

---

## 6. Standards, accreditation and liability for issuing SoH certificates

### Takeaway
There is **no harmonised EU standard or legally mandated methodology for a used-EV "SoH certificate."** Credibility today comes from:
- brand trust (DEKRA, TÜV);
- proprietary, sometimes patented, test methods;
- emerging standards: SAE J3257 (work in progress, customer-facing SoH), IEC 63330-1:2024 and UL 1974 (second-life repurposing), and DIN DKE SPEC 99100 (passport data definitions);
- the regulated GTR 22/Euro 7 SOCE as the reference metric.

Academic work (2025) explicitly calls for a standardised vehicle-level SoH procedure. ISO/IEC 17025 accreditation and certificate liability could not be researched in depth.

### Cited Findings
- **SAE J3257 (WIP)** "Battery State of Health for Electrified Vehicles" defines a customer-facing EV battery SoH measure, a standard calculation method and a procedure for verifying accuracy. — [SAE International](https://www.sae.org/standards/content/j3257/). No results were found for "SAE J3223" or "J3326" as SoH standards (the search returned nothing).
- "No standardized method for measuring the state of health at the vehicle level has been established." An npj Clean Energy (2025) paper proposes energy- and capacity-based metrics. — [npj Clean Energy](https://www.nature.com/articles/s44406-025-00010-8) (search summary)
- **Second-life standards:**
  - **IEC 63330-1:2024** specifies the procedure for assessing the safety of second-life lithium-ion batteries in applications other than their first life.
  - **UL 1974** covers sorting and grading of batteries for repurposing, starting with SoH and capacity evaluation.
  - IEC 63330 is described as the European counterpart to UL 1974 (US/Canada). Both rely on BMS first-life data.
  - UL also offers repurposing-facility certification.
  - — [ScienceDirect "Sustainable repurposing of EV batteries: A methodology for certification in the EU"](https://www.sciencedirect.com/science/article/pii/S2950264025000802); [UL Solutions](https://www.ul.com/resources/ul-1974-creating-safe-second-life-electric-vehicle-batteries); [UL facility certification](https://www.ul.com/services/second-life-electric-vehicle-battery-repurposing-facility-certification)
- **DIN DKE SPEC 99100:2025-02** "Requirements for data attributes of the battery passport" is the reference specification for passport SoH attributes. Among other definitions:
  - SOCE (per GTR 22)
  - capacity fade
  - remaining power capability
  - internal-resistance increase, calculated as (R(x) − R_BOL)/R_BOL × 100%
  - round-trip-efficiency fade
  - negative events
  - time at extreme temperatures
  - — [Battery Pass data model / DIN DKE SPEC 99100](https://github.com/batterypass/BatteryPassDataModel/blob/main/BatteryPass/io.BatteryPass.Performance/1.2.1/PerformanceAndDurability.ttl)
- **Incumbent certificate practice:**
  - DEKRA offers an "independent and patented" battery test for BEVs and PHEVs with an SoH certificate "in 15 minutes." SoH is determined from model-specific resistance. The certificate shows SoH, OEM data (nominal capacity, cell voltage and current), VIN and mileage. DEKRA also offers a cheaper "SoH read-out" report based on OEM data.
  - TÜV Rheinland markets a "certified battery test" to build trust in the used-car market.
  - TÜV SÜD cooperates with CARA "to establish and certify an independent standard for battery assessment."
  - — [DEKRA](https://www.dekra.com/en/battery-test-for-electric-cars/); [DEKRA read-out](https://www.dekra.com/en/battery-test-for-electric-cars-read-out/); [TÜV Rheinland](https://www.tuv.com/press/en/press-releases/newsroom-detail-page_373445.html); [TÜV SÜD/CARA](https://www.tuvsud.com/en/knowledge-hub/technical-updates/automotive-essentials/tuv-sud-cooperates-with-cara-to-standardize-battery-assessment)
- The JRC has reviewed standards for EV battery performance assessment (JRC113420) and performance and durability requirements under the Battery Regulation (JRC136381). — [JRC 2018](https://publications.jrc.ec.europa.eu/repository/bitstream/JRC113420/kjna29371enn.pdf); [JRC 2024](https://publications.jrc.ec.europa.eu/repository/bitstream/JRC136381/JRC136381_01.pdf) (not read)

### Inferences
- The absence of a mandated certificate methodology lowers entry barriers but raises credibility barriers. A new entrant will need to:
  - align its headline metric with **SOCE per GTR 22** and capacity fade per DIN DKE SPEC 99100, so results are comparable to the passport and Euro 7 values;
  - publish its method and uncertainty band;
  - consider **ISO/IEC 17025** laboratory accreditation for any physical test procedure, and possibly ISO/IEC 17020 for inspection bodies. This is an inference; not verified;
  - track SAE J3257 and any CEN/CENELEC work.
- **Liability** for a certificate that affects vehicle price is likely governed by national contract and tort law (e.g., Luxembourg civil code, negligent misstatement to third-party buyers), plus consumer-protection rules. Professional indemnity insurance and clear scope/limitation clauses would be standard mitigations. This is an inference; no source was retrieved.

### Gaps
- "DIN SPEC 91472" could not be verified as an SoH standard; no source was found. The relevant DIN document found is **DIN DKE SPEC 99100**.
- IEC 62660 (cell performance and reliability tests) applicability to vehicle-level SoH certification was not researched.
- No source was found on ISO/IEC 17025 accreditation practice for used-EV SoH tests, or on court cases or liability claims over SoH certificates.
- No EU or Luxembourg rule was found requiring used-car sellers to disclose SoH, which would be a strong demand driver. This is unverified either way.

---

## 7. GDPR considerations for vehicle data (VIN, location)

### Takeaway
The CJEU (C-319/22 *Scania*, 9 Nov 2023) held that a **VIN is personal data for anyone who can reasonably link it to a person**. It also held that 2018/858 creates a legal obligation (GDPR Art. 6(1)(c)) for manufacturers to provide VINs to independent operators. An SoH business that combines VIN, mileage, location or charging history with owner identity is therefore a GDPR controller and needs a lawful basis, typically contract or consent from the vehicle owner. The Data Act does not override the GDPR.

### Cited Findings
- **CJEU C-319/22 (9 Nov 2023):** the VIN is not personal data per se, but "becomes personal data as regards someone who reasonably has means of enabling that datum to be associated with a specific person." If independent operators can link it, it is personal data for them and indirectly for OEMs. — [European Law Blog](https://www.europeanlawblog.eu/pub/88nomk75); [Prighter](https://prighter.com/resources/cjeu-ruling-gdpr-scope-vehicle-data-identifiability/); [DPCuria](https://www.dpcuria.eu/case?reference=C-319%2F22)
- The Court found that Regulation 2018/858 imposes a "legal obligation" on vehicle manufacturers, as GDPR controllers, to make VINs available to independent operators. — [Morgan Lewis](https://www.morganlewis.com/pubs/2023/12/european-court-of-justice-facilitates-access-to-vehicle-data-for-independent-vehicle-repairers); [Taylor Wessing 2023](https://www.taylorwessing.com/en/insights-and-events/insights/2023/11/eu-gerichtshof-faellt-wegweisendes-urteil-im-scania-fall) (title)
- The Battery Pass consortium flags "data privacy" as a caveat on update intervals for dynamic passport data. — [Battery Pass Content Guidance, p. 161](https://github.com/batterypass/BatteryPassDataModel/blob/main/docs/1.2/2023_Battery_Passport_Content_Guidance.pdf)

### Inferences
- SoH certificates are VIN-linked by design, so they are personal data whenever the holder can identify the owner. Charging-location and trip data are more sensitive and should be minimised; SoH analytics rarely needs GPS.
- In a used-car sale, the seller (data subject) commissions the test and the buyer receives the certificate. Consent or contract terms should explicitly cover disclosure to prospective buyers, lenders or lessors.

### Gaps
- The EDPB Guidelines 01/2020 on connected vehicles (v2.0) could not be retrieved to cite specific positions on diagnostic, location or telematics data.
- The Luxembourg CNPD position on vehicle data was not researched.

---

## 8. US comparison: CARB ACC II SoH display (MY2026) and EPA battery durability

### Takeaway
California's ACC II required a customer-readable battery SoH metric on 2026+ model-year ZEVs and PHEVs, and EPA's March 2024 rule added GTR 22-based battery-durability requirements from MY2027. Both have since been undermined:
- Congress used the CRA (signed June 2025) to revoke the ACC II waiver.
- EPA rescinded the GHG endangerment finding and **all** vehicle GHG standards (final rule 18 Feb 2026, effective 20 Apr 2026).

The legal status of the SoH and durability provisions is now uncertain. Some OEMs (e.g., Toyota bZ 2026) nonetheless ship on-board SoH displays.

### Cited Findings
- **CARB ACC II:**
  - Battery-label requirements are in **13 CCR §1962.6**, applying to **2026 and later MY** ZEVs, PHEVs and HEVs.
  - Manufacturers must provide a "**customer readable state of health metric**" displaying deterioration relative to new.
  - The ACC II SoH monitor is "based on vehicle range and not energy left in the battery."
  - — [WardsAuto](https://www.wardsauto.com/regulatory/ev-regulations-continue-evolving); [CARB ACC II rulemaking](https://ww2.arb.ca.gov/rulemaking/2022/advanced-clean-cars-ii); [CARB durability presentation to UNECE EVE-57](https://wiki.unece.org/download/attachments/172852349/EVE-57-13e%20-%20CARB%20ACCII%20-%20updated.pdf?version=1&modificationDate=1663760313115&api=v2&download=true) (search summaries)
- The 2026 Toyota bZ owner's manual describes an on-board battery SoH display. — [Tesla Motors Club forum](https://teslamotorsclub.com/tmc/threads/traction-state-of-health-on-board-display-2026-toyota-bz.352568/) (anecdotal)
- **ACC II waiver:** as of June 2025 the waiver was revoked by Congress via the Congressional Review Act. GAO had warned the waiver was not subject to the CRA. Litigation over validity is implied. — [DieselNet](https://dieselnet.com/news/2025/05us2.php); [S&P Global Mobility](https://www.spglobal.com/automotive-insights/en/blogs/2025/05/california-advanced-clean-cars-zev-rules); [RMI](https://rmi.org/understanding-californias-advanced-clean-cars-ii-regulation/)
- InsideEVs headline: "Vetting A Used EV Battery Was About To Get Easier. Then Trump Happened." — [InsideEVs](https://insideevs.com/features/789263/battery-used-ev-trials-hardship/) (title only)
- **EPA:** the **20 Mar 2024** final rule for MY2027+ light- and medium-duty vehicles added battery-durability requirements for BEVs and PHEVs. Non-compliant BEVs forfeit related GHG and NMOG+NOx credits. — [Gibson Dunn](https://www.gibsondunn.com/us-epa-releases-final-model-year-2027-vehicle-multi-pollutant-emissions-standards-practical-takeaways-for-the-automotive-industry/); [EPA](https://www.epa.gov/regulations-emissions-vehicles-and-engines/final-rule-multi-pollutant-emissions-standards-model)
- **EPA rescission:** on **18 Feb 2026** EPA finalised rescission of the 2009 endangerment finding and repealed **all GHG emission standards** for light-, medium- and heavy-duty vehicles and related GHG test, ABT and reporting provisions, effective **20 Apr 2026**. — [Federal Register 2026-03157](https://www.federalregister.gov/documents/2026/02/18/2026-03157/rescission-of-the-greenhouse-gas-endangerment-finding-and-motor-vehicle-greenhouse-gas-emission); [Holland & Knight](https://www.hklaw.com/en/insights/publications/2026/02/epa-repeals-vehicle-all-greenhouse-gas-standards-for-vehicles); [Kirkland & Ellis](https://www.kirkland.com/publications/kirkland-alert/2026/03/us-environmental-protection-agency-issues-final-rule)

### Inferences
- The EU is now the more stable regulatory driver for SoH transparency. Euro 7 and the Battery Regulation are in force and have not been reversed, whereas US federal and California requirements are in legal limbo.
- The EPA battery-durability rule was tied to both GHG and NMOG+NOx credits. Whether its monitor requirement survives the GHG repeal is unclear. The NMOG+NOx linkage might keep part of it alive; this is speculative.

### Gaps
- It is unconfirmed whether CARB still enforces §1962.6/1962.7 SoH display and durability for MY2026 after the CRA, or how pending litigation stands.
- It is unconfirmed whether EPA's battery-durability monitor (40 CFR 86.1815-27, which appeared in search results but was not reviewed) was repealed, retained or stayed.
