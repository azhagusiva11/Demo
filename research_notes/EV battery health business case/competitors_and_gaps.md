# Competitive Landscape: EV Battery State-of-Health (SoH) Assessment Services and Software (as of 25 Sept 2026)

> **Method note for the report writer.** These notes are built from ~70 web searches run on 25 Sept 2026. Fetching full pages was **blocked by the session's egress proxy** for electrive.com, arxiv.org, evs38-program.org, whichev.net and get-moba.com. So most facts come from search-engine result summaries of the linked pages, not from reading the pages in full. Numbers are reported as the search results gave them, and anything uncertain is flagged. Before a figure goes into investor-facing material, open the linked page and check it. Labels used: **[Vendor]** = the company's own claim or press release; **[Independent]** = third-party test, academic study or association study; **[Trade press]** = journalism; **[Low-quality]** = blog or aggregator of uncertain reliability.

---

## 1. Competitor profiles: method, time per test, accuracy claims, coverage, pricing, customers, funding and size

### Takeaway
The market has split into four groups:
- **Plug-in certificate providers** for dealers and remarketing: Aviloo, Moba, Generational, DEKRA, Altelium, PKC, CertifyCar.
- **Workshop scan-tool makers** that bundle SoH, often cheaply or for free: Mahle, Bosch, Hella Gutmann, Autel, Carly.
- **Cloud and telematics analytics** for fleets, OEMs and battery storage: TWAICE, volytica, Elysia, Accure, Recurrent, Geotab, Samsara, Cox/Manheim.
- **Connected-car data APIs** that expose mostly state of charge, not SoH: Smartcar, High Mobility, Enode, Mobilisights.

Aviloo is the clear European leader in 2026: €30M raised in Feb 2026, 750+ customers, 500k+ tests, and a free purchase warranty in 26 countries including Luxembourg. The 3-minute read-out of the car's own battery management system (BMS) has become a low-price commodity, at €0–€35 per test for businesses.

### Cited Findings

#### A. Independent plug-in certificate providers (dealer, remarketing and consumer)

**Aviloo (Vienna, Austria; founded 2018)**
- Products: FLASH test (3 minutes, reads data through the OBD port; aimed at dealers, fleets and remarketing) and PREMIUM test (the car is driven through a complete discharge cycle and a box logs the data; most detailed; for consumers) — [Aviloo via search summary](https://aviloo.com/en/b2b-aviloo-flash-test); [Forbes, 29 Jul 2026](https://www.forbes.com/sites/jamesmorris/2026/07/29/how-aviloo-is-solving-the-used-ev-market-battery-health-trust-problem/) **[Vendor/Trade press]**
- How the Premium test runs with ADAC (Germany): a test box plugs into the OBD port and the car is driven normally for up to 7 days until charge falls below 10% — [electrive.net, 16 May 2022](https://www.electrive.net/2022/05/16/adac-bietet-soh-pruefung-der-antriebsbatterie-an/) **[Trade press]**
- FLASH method: a machine-learning model trained on "tens of thousands" of PREMIUM tests, reported to use vehicle age, mileage and charging behaviour to give SoH in 3 minutes. Aviloo's CPO says "SoH is not always SoH", because reference values and calculation methods differ — [Powertrain International](https://www.powertraininternationalweb.com/sustainability/soh-aviloo-battery/); [Aviloo fact-check PDF](https://aviloo.com/files/Aviloo/content/pdf/PM_Faktencheck_SOH_engl.pdf) **[Vendor]**
- Pricing:
  - B2B: annual box licence of €480 ($550) plus €35 ($40) per FLASH test, according to CEO Marcus Berger — [Forbes, 29 Jul 2026](https://www.forbes.com/sites/jamesmorris/2026/07/29/how-aviloo-is-solving-the-used-ev-market-battery-health-trust-problem/)
  - US: $35 per FLASH test, billed monthly — [Aviloo Certified US](https://aviloo.com/en-us/aviloo-certified)
  - Consumer PREMIUM: typically €99 in EU countries (search summary; source page not confirmed) — [WhichEV review, 29 Jul 2026](https://www.whichev.net/2026/07/29/aviloo-premium-battery-test-2026-review/)
  - A Finnish retailer lists a test at €95 — [Futurez.fi](https://www.futurez.fi/en/shop/devices-accessories/electric-car-accessories/aviloo-premium-ev-electric-car-battery-test/)
  - Australia/NZ: from $200 (search summary)
  - A German aggregator puts Aviloo at roughly €30–150 depending on the test — [search summary of German guides, e.g. Meistercheck](https://www.meistercheck.de/ratgeber/batterietest-e-auto-soh) **[Low-quality]**
- Scale: "over 750 customers across more than 30 countries", from OEM dealer networks to fleets, remarketing platforms and inspection organisations (Feb 2026) — [Global Fleet](https://www.globalfleet.com/en/remarketing/europe/article/aviloo-secures-eu30m-funding-global-expansion?a=FJA05&t%5B0%5D=EV%20Battery&t%5B1%5D=Remarketing&curl=1); [electrive, 11 Feb 2026](https://www.electrive.com/2026/02/11/battery-diagnostics-specialist-aviloo-secures-e30-million/) **[Vendor/Trade press]**
- Data scale: the first "Aviloo Certified EV Battery Report" analysed more than 500,000 tests across 20 models. Median SoH after 150,000 km ranged from 87% to 94% (Sept 2026) — [electrive, 8 Sept 2026](https://www.electrive.com/2026/09/08/aviloo-expands-battery-warranty-to-26-countries/); [Electrek, 3 Sept 2026](https://electrek.co/2026/09/03/evs-retain-battery-best-aviloo-largest-study/) **[Vendor data]**
- Funding: about €30M from Armira Growth (Feb 2026), with existing investors Invest AG and Raiffeisen KMU Invest. Armira and Invest AG bought out the EIC Fund, one of the earliest investors. The money is for expansion into the US and Asia, new products and OEM/battery-industry partnerships — [electrive, 11 Feb 2026](https://www.electrive.com/2026/02/11/battery-diagnostics-specialist-aviloo-secures-e30-million/); [Startbase](https://www.startbase.com/news/armira-growth-investiert-rund-30-mio-euro-in-ev-batteriediagnostik-spezialisten-aviloo); [EIC portfolio](https://eic.ec.europa.eu/eic-fund/eic-fund-portfolio/aviloo_en) **[Trade press]**
- Warranty built on the test (a key competitive move):
  - Launched June 2026 in France and Sweden as a "purchase guarantee" worth up to €3,000 for battery defects — [electrive, 16 Jun 2026](https://www.electrive.com/2026/06/16/e3000-for-battery-defects-aviloo-converts-battery-diagnostics-into-a-purchase-guarantee/)
  - By Sept 2026 it covered 26 European countries, **including Luxembourg**, Belgium, the Netherlands and Germany. Any qualifying FLASH test gets the warranty at no extra cost. UK terms: one year, £2,700 compensation plus a refund of the test cost if SoH falls below the guaranteed level — [electrive, 8 Sept 2026](https://www.electrive.com/2026/09/08/aviloo-expands-battery-warranty-to-26-countries/)
  - Sources disagree on the count: [EMobility+, 7 Sept 2026](https://emobilityplus.com/2026/09/07/aviloo-expands-ev-battery-warranty-to-14-more-european-markets-reaching-24-countries/) says **24 countries**; electrive says 26. **[Vendor/Trade press]**
- Partners: ADAC in Germany; GTÜ and TÜV SÜD reported as partners in German aggregator summaries — [electrive.net 2022](https://www.electrive.net/2022/05/16/adac-bietet-soh-pruefung-der-antriebsbatterie-an/). **Automobile Club du Luxembourg (ACL)**: its Diagnostic Center has offered the Aviloo test since 2021 and the FLASH test since 2023 — [Infogreen.lu](https://www.infogreen.lu/l-acl-lance-le-premier-test-independant-de-batterie-de-voiture-electrique.html); [ACL](https://www.acl.lu/en/mobility/vehicle-diagnostics/). Resellers include TestEV — [testev.co](https://testev.co/)
- Certification: the FLASH test holds "Battery Health Check CARA Approved®" — [CARA-Europe](https://cara-europe.org/battery-health/)

**Moba (France; formerly Batteries for People / "La Belle Batterie")**
- Method: a smartphone app plus OBD dongle reads the BMS and issues a "Moba SoH certificate" with SoH %, summer and winter range, remaining factory warranty and the previous owner's charging behaviour. Takes under 2–3 minutes and needs no special training — [Moba CertifyPro](https://get-moba.com/en/moba-certify-pro-en/); [Moba home](https://get-moba.com/en/home/) **[Vendor]**
- Coverage: "400+" EV/PHEV models (older page). "More than 900 models, >90% of the European fleet" (2026 TECH360 announcement) — [Alliance Automotive Group Benelux](https://www.allianceautomotivegroupbenelux.com/en/news/tech360-and-moba-join-forces-for-fast-and-reliable-ev-battery-diagnostics) **[Vendor]**
- Consumer pricing (La Belle Batterie kit, older): €29 at launch, then €49 — [Automobile Propre](https://www.automobile-propre.com/voiture-electrique-test-kit-diagnostic-belle-batterie/); [Direct Assurance](https://www.direct-assurance.fr/assurance-auto/autres-mobilites/startup-analyse-performance-batterie-voiture-electrique) **[Trade press]**. No current B2B price found.
- Company: founded and led by Guillaume Hébert; went through the MoveLab programme at Station F; Engie is a shareholder; was preparing a round of about €1.8–2M (dated). About 500 diagnostics a month since Jan 2023, more than half outside France (dated figure) — [Journal Auto](https://journalauto.com/services/batteries-for-people-devient-moba/); [L'Argus](https://www.largus.fr/pros/actualite-automobile/la-start-up-moba-obtient-une-certification-europeenne-pour-le-diagnostic-des-batteries-30027360.html) **[Trade press]**
- Certification: CertifyPro is CARA-certified — [L'Argus](https://www.largus.fr/pros/actualite-automobile/la-start-up-moba-obtient-une-certification-europeenne-pour-le-diagnostic-des-batteries-30027360.html)
- Partners:
  - **GO Remarketing Solutions** is the NL/BE partner — [GO Remarketing](https://go-remarketing.com/services/state-of-health/)
  - **TECH360 (Alliance Automotive Group Benelux) garage network** (2026): members can offer pre-purchase SoH tests — [AAG Benelux](https://www.allianceautomotivegroupbenelux.com/en/news/tech360-and-moba-join-forces-for-fast-and-reliable-ev-battery-diagnostics); [AMT.nl](https://www.amt.nl/246812/tech360-en-moba-bundelen-krachten-voor-betrouwbare-ev-batterijtests)
  - **Arnold Clark** (UK's largest dealer group), March 2026 — [Motor Trader, 12 Mar 2026](https://www.motortrader.com/motor-trader-news/automotive-news/arnold-clark-partners-with-battery-diagnostics-company-moba-12-03-2026) **[Trade press]**

**Generational (UK)**
- Method: its own OBD dongle reads the BMS and produces an SoH report with cell-level condition data "within minutes". Cell-level voltage testing launched 8 Apr 2026 — [Generational](https://generational.ac/); [Generational press release](https://generational.ac/press-release-generational-launches-cell-level-ev-battery-voltage-testing/) **[Vendor]**
- Pricing: tests from £28.50, falling with volume, no monthly commitment; kit delivery £95 plus £100 setup fee (search summary of UK trade coverage) — [AM-online](https://www.am-online.com/news/generational-adds-cell-level-ev-battery-testing-for-dealers); [IMDA](https://theimda.co.uk/generational/) **[Trade press]**
- Distribution: agreement with Maverick Diagnostics (July 2026) to reach about 6,000 UK workshops — [electrive, 15 Jul 2026](https://www.electrive.com/2026/07/15/generational-brings-ev-battery-testing-to-6000-uk-workshops/); [Charged EVs](https://chargedevs.com/newswire/generational-and-maverick-diagnostics-to-bring-ev-battery-health-testing-to-uk-car-repair-shops/) **[Trade press]**
- Data claims: its Battery Performance Index, built on more than 8,000 UK assessments, puts average SoH at 95.15%, with 8–9-year-old cars at a median 85%. Tested BEVs sold "4 days faster" than untested ones — [Renewable Energy Magazine, 18 Feb 2026](https://www.renewableenergymagazine.com/electric_hybrid_vehicles/uka-s-largest-usedev-battery-study-reveals-20260218); [Renewable Energy Magazine, 19 Jan 2026](https://www.renewableenergymagazine.com/electric_hybrid_vehicles/generational-rolls-out-ev-battery-testing-technology-20260119) **[Vendor]**
- Funding: backed by the UK Advanced Propulsion Centre (amount not found). CARA-approved — [The EV Report](https://theevreport.com/generational-maverick-ev-battery-testing); [Generational](https://generational.ac/)

**Altelium (UK)**
- Offers an independent battery test, dealer ("trade") reports and consumer certificates. Its platform models multiple data sources and compares SoH with expected degradation for the same vehicle type. Launched Nov 2023 — [Autosphere, 10 Nov 2023](https://autosphere.ca/fleet/2023/11/10/altelium-launches-independent-battery-health-test-certificate-extended-warranties/); [Altelium](https://altelium.com/battery/) **[Vendor/Trade press]**
- Differentiator: battery degradation and failure warranties underwritten with 'A'-rated insurers through Lloyd's of London. Pays a fixed cash settlement if health drops by a set amount in year 1, and offers extended warranties up to 3 years beyond the OEM warranty — [Collision Repair Mag](https://www.collisionrepairmag.com/news/ev/article/15732630/new-life-for-used-cars-altelium-launches-independent-battery-health-test-certificate-and-extended-warranties-for-used-electric-vehicles) **[Vendor]**

**DEKRA (Germany; global inspection company)**
- Two products:
  - "DEKRA Battery Test": about 10–15 minutes ("connect, accelerate, certificate"), gives SoH on a 1–100 scale
  - "SoH Read-Out Report": under 5 minutes, BMS read-out
  - [DEKRA](https://www.dekra.com/en/battery-test-for-electric-cars/); [DEKRA read-out](https://www.dekra.com/en/battery-test-for-electric-cars-read-out/); [DEKRA Sweden](https://dekra-batteritest.se/en/our-battery-tests/dekra-battery-test/) **[Vendor]**
- Pricing: B2B is a monthly subscription plus a per-report fee, with no public figures (search summary). A German aggregator quotes about €100–150 to consumers **[Low-quality]**
- Certification: DEKRA's Battery SoH Report holds CARA Approved® — [CARA-Europe](https://cara-europe.org/battery-health/)

**TÜV family / CertifyCar / PKC**
- **TÜV Rheinland + TWAICE "Battery Quick Check"**: a joint venture that launched Sept 2023. A workshop diagnostic tool (Hella Gutmann) read current, voltage and temperature and sent them to a cloud algorithm; TÜV certified the report — [TÜV Rheinland](https://www.tuv.com/press/en/press-releases/newsroom-detail-page_373445.html). **Discontinued 28 Feb 2025** (see Section 5).
- **TÜV SÜD** set up and chairs the CARA Battery SoH working group — [TÜV SÜD](https://www.tuvsud.com/en/knowledge-hub/technical-updates/automotive-essentials/tuv-sud-cooperates-with-cara-to-standardize-battery-assessment). **TÜV NORD** runs "BatteryCheck" — [TÜV NORD](https://www.tuev-nord.de/en/services/audit-and-expertise/institute-for-vehicle-technology-and-mobility-ifm-1/onboard-car-diagnosis/batterycheck/). A German aggregator quotes TÜV quick checks at about 90 minutes and €150–200 **[Low-quality]**.
- **CertifyCar**: customers receive an official CARA certificate issued by TÜV — [CertifyCar](https://certifycar.eu/en/produkt/state-of-health-soh/)
- **PKC Power Check Control** (Infocar, sold by Logicat in the UK): CARA-certified SoH certificate — [Logicat](https://logicat.co.uk/infocar-power-check-control/)

#### B. Workshop and scan-tool makers bundling SoH (a source of commoditisation)

- **Mahle**:
  - "E-Scan" received CARA approval (March 2026). It gives SoH in under 2 minutes with no test drive and was made **available free of charge** on Mahle and Brain Bee TechPRO diagnostic devices — [Mahle Newsroom](https://newsroom.mahle.com/press/en/press-releases/mahle-receives-cara-certification-for-battery-diagnostic-function-e-scan-112064); [electrive, 2 Mar 2026](https://www.electrive.com/2026/03/02/mahle-battery-diagnostics-system-receives-cara-certification/); [PROFI-Werkstatt](https://www.profi-werkstatt.net/en/news/mahle-e-scan-certified-cara-certified-battery-diagnosis-under-two-minutes-233078.html) **[Vendor]**
  - "E-HEALTH Charge": a 15-minute, brand-independent SoH diagnosis that measures the battery during charging with the E-CHARGE 20 (a 22 kW DC charger) and combines this with OBD values — [Mahle Aftermarket](https://www.servicesolutions.mahle.com/eu/en/product-lines/batterypro/e-health-charge/) **[Vendor]**
- **Hella Gutmann**: took over the "Battery Quick Check" name from 1 March 2025 and runs the assessment directly on its diagnostic device — [auto.news](https://auto.news/artikel/hella-gutmann-solutions-uebernimmt-quick-battery-check-vom-tuev-rheinland); [electrive.net, 3 Feb 2025](https://www.electrive.net/2025/02/03/tuev-rheinland-gibt-battery-quick-check-weiter/)
- **Bosch**: its workshop battery test was evaluated in the BOVAG/VER study (Section 3) — [Automotive Online, 19 Dec 2024](https://www.automotive-online.nl/werkplaats/2024/12/19/onderzoek-batterijtesten-moba-en-aviloo-scoren-het-hoogst-bosch-minder/)
- **Autel MaxiSys Ultra EV** (a scan tool that also works on Launch-type platforms): shows pack SoC, SoH, voltage, current, temperature, module-level analysis and maintenance recommendations — [Autel store](https://store.autel.com/products/maxisys-ultra-ev); [Carvitas](https://carvitas.com/blog-and-news/mastering-ev-diagnostics-a-deep-dive-into-autels-battery-health-tools-for-electric-vehicles) **[Vendor]**. No specific Launch SoH product was found.
- **Carly** (Germany): "Carly Enterprise" OBD scanner plus app with an SoH feature giving full diagnostics in under 3 minutes. Aimed at fleet managers, garages, dealerships and insurers — [EV Fleet World](https://evfleetworld.co.uk/vehicle-assessment-tool-debuts-with-battery-state-of-health-feature/); [Carly Enterprise](https://enterprise.mycarly.com/) **[Vendor]**. Pricing not found.

#### C. Cloud, telematics and fleet analytics (no test drive)

**Recurrent (Seattle, US)**
- Method: collects real-world driving and charging data from connected cars through telematics and scores battery and range. Free to individual owners; dealers pay a monthly subscription covering their EV inventory, and reports embed on dealer vehicle pages — [Recurrent dealers FAQ](https://www.recurrentauto.com/dealers/faq); [Green Car Reports](https://www.greencarreports.com/news/1130709_startup-aims-to-be-a-carfax-for-evs-with-battery-health-reports) **[Vendor/Trade press]**
- Scale: "over 1 billion miles" from more than 50,000 vehicles — [Recurrent](https://www.recurrentauto.com/news/1-billion-miles-later) **[Vendor]**. Alliance with Experian (Jan 2023) — [BusinessWire](https://www.businesswire.com/news/home/20230126005310/en/5378306/New-Experian-Alliance-With-Recurrent-Empowers-Dealers-to-Make-Informed-EV-Acquisitions-and-Ease-Range-Anxiety-for-Consumers)
- Funding:
  - $3.5M seed led by Wireframe Ventures — [Recurrent](https://www.recurrentauto.com/news/recurrent-raises-3-5m-seed-round-to-provide-electric-vehicle-battery-reports)
  - $16M Series A (Jan 2024) led by ArcTern Ventures, with Goodyear Ventures and Automotive Ventures — [GeekWire, 2024](https://www.geekwire.com/2024/seattle-startup-recurrent-raises-16m-aims-to-be-standard-for-scoring-used-ev-batteries/)
  - About $24M in total — [Tracxn](https://tracxn.com/d/companies/recurrent-auto/__8qnousko9v6l7_VmS4VqO8VOaCmnU4a2nIgI68UHoGM)
  - **Unverified:** one search summary mentioned an additional "$4.5M in April 2026" with no identifiable source, and a targeted follow-up search could not confirm it — see Gaps.
- Geography: US-focused. No evidence of European operations was found.

**TWAICE (Munich, Germany)**
- Predictive battery analytics platform for battery energy storage systems (BESS) and EVs, sold to OEMs and operators. About $105M raised — [Tracxn](https://tracxn.com/d/companies/twaice/__Q1YZOxAc-FTx6Us_BU5hcCufvyiZBzp8QscgzbNraFo). **€24M EIB venture-debt loan backed by InvestEU (5 Feb 2026).** Its BESS business "nearly tripled" in 2025 — [EIB press release](https://www.eib.org/en/press/all/2026-045-eib-invests-eur24-million-in-twaice-to-accelerate-the-energy-transition-with-predictive-battery-analytics); [ESS News, 6 Feb 2026](https://www.ess-news.com/2026/02/06/flower-raises-e60m-in-debut-bond-as-twaice-secures-e24m-eib-financing/) **[Trade press/Vendor]**
- Has left the used-car testing business (see Section 5).

**volytica diagnostics (Dresden, Germany; Fraunhofer spin-off, 2019)**
- Its cloud "vdx engine" tracks SoH, round-trip efficiency, stress and anomalies from operating data. Customers are fleet operators, leasing companies, insurers and OEMs — [volytica](https://www.volytica.com/solutions/e-mobility/) **[Vendor]**
- Customers and partners:
  - Enel X (e-buses in Mexico City) — [Sustainable Bus](https://www.sustainable-bus.com/components/battery-diagnostics-for-e-buses-enel-x-selects-volytica/)
  - TÜV NORD Mobility, on the sale of 259 used BYD e-buses in Overijssel, NL, described as "the largest used e-bus transaction in Europe" — [volytica](https://www.volytica.com/Insights/tuv-nord-mobility-and-volytica-diagnostics-facilitate-the-largest-used-e-bus-transaction-of-europe-to-date/)
  - CarMedialab (e-bus telematics) — [CarMedialab, Jun 2023](https://www.carmedialab.com/en/2023/06/23/joint-solution-for-battery-monitoring-in-electric-buses/)
  - Bridgestone's Webfleet EV services platform — [Sustainable Bus](https://www.sustainable-bus.com/its/volytica-diagnostics-bridgestone-webfleet-platform-mobility/)
  - Cling Systems (circular battery trading) — [volytica](https://www.volytica.com/solutions)
- Funding and size: €5.5M round (Sept 2023) led by SHIFT Invest and EnBW New Ventures — [EU-Startups](https://www.eu-startups.com/2023/09/dresden-based-volytica-closes-e5-5-million-to-refine-battery-analytics-ahead-of-new-era-of-electrification/). About $8.2M raised in total and roughly 23–28 employees (2026 profiles) — [Tracxn](https://tracxn.com/d/companies/volytica/__bfD-ZYXmAd0v7g2IQidedMg0VFV4hWHz5iydn_oJ2bQ); [Dealroom](https://app.dealroom.co/companies/volytica_diagnostics). ISO 27001 certified (May 2023) — [volytica](https://www.volytica.com/Insights/iso-27001-certification-volytica/)

**Elysia (Fortescue Zero; Kidlington, UK; formerly part of Williams Advanced Engineering)**
- Embedded BMS software plus cloud analytics that combine physics-informed "digital twins" with probabilistic machine learning to give virtual sensors, SoH forecasts and degradation diagnostics — [Elysia](https://elysia.co/); [Forbes, Oct 2024](https://www.forbes.com/sites/jamesmorris/2024/10/26/elysia-better-software-can-unlock-hidden-potential-in-ev-batteries/) **[Vendor]**
- Customers: JLR multi-year deal (May 2024), starting with the Range Rover Electric — [JLR Media](https://media.jaguarlandrover.com/news/2024/05/jlr-signs-deal-fortescue-advanced-ev-battery-intelligence-technologies-luxury-vehicles); [electrive, 21 May 2024](https://www.electrive.com/2024/05/21/jlr-to-utilize-elysia-battery-software-from-fortescue/). "Over 7 GWh" of connected assets — [Elysia](https://elysia.co/)
- Acquired **Zitara**, a US BESS analytics company, which continues as a brand folded into Elysia (acquisition date not confirmed) — [Solar Power Portal](https://www.solarpowerportal.co.uk/battery-storage/fortescue-s-uk-battery-intelligence-platform-adds-onsite-storage-controls-company-zitara)
- Focus is OEM, mining and stationary storage, **not** used-car certificates.

**ACCURE Battery Intelligence (Aachen, Germany; 2020)**
- Cloud AI analytics on voltage, current and temperature with no added hardware. $16M Series B (Feb 2025) led by Incharge Capital Partners; about $34.6M raised in total. Customers include TotalEnergies, New York City Transit and BVG Berlin; ">6 GWh" of storage and EV fleets — [FinSMEs, Feb 2025](https://www.finsmes.com/2025/02/accure-battery-intelligence-raises-16m-in-series-b-funding.html); [ACCURE](https://www.accure.net/news/accure-battery-intelligence-secures-16-million-to-scale-battery-safety-and-performance-offerings-across-europe-americas-and-asia-pacific) **[Vendor]**

**Geotab / Samsara (fleet telematics)**
- Geotab runs an EV Battery Degradation Tool, first built on 6,300 EVs. Its updated study covers 22,700+ EVs across 21 makes and models and finds **average degradation of 2.3% a year** (vs 1.8% in its 2024 study). Heavy DC fast charging above 100 kW means up to 3.0% a year, against about 1.5% for mostly AC charging. Hot climates add about 0.4% a year — [Geotab press release](https://www.geotab.com/press-release/ev-battery-health-degradation-fast-charging-study/); [Geotab blog](https://www.geotab.com/blog/ev-battery-health/) **[Vendor data]**
- Samsara lets fleets track battery capacity and health over time — [Samsara](https://www.samsara.com/products/telematics/electric-vehicles-deprecated) **[Vendor]**. No detail on method or pricing found.

**Cox Automotive / Manheim (US wholesale auctions)**
- VIN-specific battery health rolled out across Manheim sites (27 Mar 2024). It uses the in-car LotVision device to read battery health automatically and posts a 0–100% score to condition reports — [Cox Automotive](https://www.coxautoinc.com/insights-hub/cox-automotive-deploying-industry-first-vin-specific-ev-battery-health-solution-across-manheim-locations/) **[Vendor]**. This shows large marketplaces building the capability in-house.

#### D. Connected-car data APIs (raw data layer)

- **Smartcar**: its EV battery endpoint returns SoC (`percentRemaining`), range and battery capacity. **No dedicated SoH endpoint was found** — [Smartcar docs](https://smartcar.com/docs/api-reference/evs/get-battery-level); [Smartcar EV battery API](https://smartcar.com/product/api/ev-battery)
- **High Mobility** (Berlin): its EV API advertises "technical indicators of battery pack and overall EV health" plus live SoC — [High Mobility](https://www.high-mobility.com/blog/ev-api-for-developers) **[Vendor]**
- **Enode** (Oslo): EV and energy-device API focused on smart charging, SoC and control. No SoH product found — [Enode](https://enode.com/blog/guide/electric-vehicle-api)
- **Mobilisights** (Stellantis' data-as-a-service arm): exclusive source of Stellantis embedded telematics, including near-real-time "battery state" and SoC for EVs. Integrated with Geotab and Zubie; offered a free 3-month trial data pack to fleets — [Stellantis Media](https://www.media.stellantis.com/em-en/mobilisights/press/mobilisights-by-stellantis-empowers-fleet-managers-with-a-3-month-no-fee-trial-data-pack); [Geotab](https://www.geotab.com/uk/press-release/geotab-mobilisights/). No explicit SoH certificate product found.

#### E. Consumer and Tesla-specific tools

- Tesla owners use TeslaFi, Scan My Tesla (OBD/CAN dongle), Teslascope and Teslalogger. These apps report SoH %, cell voltages and cell balance — [InsideEVs](https://insideevs.com/features/718824/find-tesla-battery-degradation/); [Teslalogger](https://teslalogger.de/degradation.php) **[Trade press]**
- The low-cost end: free in-car or OEM app readings; an OBD dongle plus LeafSpy or Scan My Tesla for $30–200; telematics reports (Recurrent, Tessie) at $19–49; "dealer-grade" certificates from Aviloo, Moba or Altelium at $99–249, with a claimed ±3% accuracy — [VoltChek blog](https://voltchek.app/blog/ev-battery-health-check-app-guide) **[Low-quality]**. The ±3% figure is an unverified aggregator claim and VoltChek is itself a competing app.
- Other apps found: VoltChek (free estimate, no hardware) and EVScanner — [EVScanner](https://evscanner.app/) **[Vendor]**

#### F. Valuation, vehicle-history and remarketing platforms

- **Autovista Group** (J.D. Power; owns Glass's): worked with TWAICE and TÜV Rheinland on a "Battery Health Report" concept for BEV remarketing and residual values — [Autovista](https://autovistagroup.com/news-and-insights/how-does-battery-treatment-affect-residual-value); [Autovista24](https://autovista24.autovistagroup.com/news/how-important-are-bev-battery-health-certificates/). **DAT** publishes material on SoH and residual value — [DAT](https://www.datgroup.com/ev-residual-value/)
- **carVertical** (vehicle-history reports): announced an "EV battery and range feature" in its 2024 roadmap. **No evidence that it has launched** was found — [carVertical blog](https://www.carvertical.com/gb/blog/carvertical-report-features-and-improvements-2024)
- **Ayvens Carmarket** (Société Générale leasing arm's B2B remarketing platform): SoH certificates for used BEVs, read from the BMS by **CARA-accredited providers** (provider not named). Live in CZ, FI, FR, DE, PT and NL, with more countries to follow (Sept 2025) — [Ayvens](https://www.ayvens.com/en-cp/news/newsroom/press-releases-2025/ayvens-carmarket-launches-battery-soh-certification-for-used-evs/); [Fleet News](https://www.fleetnews.co.uk/news/battery-health-certification-for-used-evs-launched-by-ayvens)
- **viaBOVAG.nl** (NL dealer portal) lets buyers filter used EVs by tested SoH — [viaBOVAG](https://www.viabovag.nl/auto/elektriciteit)

#### G. Names in the brief that turned out to be minor or not found
- **Nuvve** (vehicle-to-grid charging), **Voltaware** (home energy), **Amodo**, **Battery ID**, **Spiral "BatteryCheck"**, **"Eletrified"** and **getbatteryreport**: targeted searches returned **no evidence** that any of them sells an EV SoH assessment product (see Gaps).
- Other small players found in passing:
  - **ioncentric** (Heilbronn, founded 2025): EIS edge sensors ("eiscube") plus cloud for battery passports and SoH — [StartUs Insights](https://www.startus-insights.com/innovators-guide/battery-analytics-companies/)
  - **Navionyx** (SoH certificate) — [Navionyx](https://navionyx.com/navionyx-certification-process.php)
  - **Logicat/PKC** (UK)
  - **Go-Remarketing "SoH certificaat voor consumenten"** (NL) — [GO Remarketing](https://go-remarketing.com/services/state-of-health/het-soh-certificaat-voor-consumenten/)
  - **Autovermeulen "batterijzeker.nl"** (NL) — [Autovermeulen](https://www.autovermeulen.nl/batterijzeker/)
  - **VWE "State of Health report"** (NL vehicle-data company) — [VWE](https://vwe.nl/en/state-of-health/)

#### Summary table (details and sources in the bullets above)

| Player | Method | Time/test | Price (dated) | Main customers | Funding/size |
|---|---|---|---|---|---|
| Aviloo (AT) | FLASH: OBD read-out plus ML model; PREMIUM: full discharge drive with logger | 3 min / up to 7 days | B2B €480/yr + €35/test; US $35; consumer ~€99 (2026) | Dealers, OEM dealer networks, fleets, remarketing, ADAC, ACL (LU) | €30M (Feb 2026); 750+ customers; 500k+ tests |
| Moba (FR) | App plus dongle, BMS read-out | <3 min | Consumer kit €29→€49 (older); B2B n/a | Dealers, garages (TECH360 Benelux), Arnold Clark UK, GO Remarketing | Small; ~€2M round targeted (dated) |
| Generational (UK) | OBD dongle, BMS plus cell voltages | minutes | from £28.50/test; £95 kit + £100 setup | UK dealers; 6,000 workshops via Maverick | APC grant; size n/a |
| DEKRA | Drive/acceleration test, or BMS read-out | 10–15 min / <5 min | subscription + per report; ~€100–150 consumer (low-quality) | Dealers, leasing, remarketing | Large corporate |
| Mahle | E-Scan BMS read-out; E-HEALTH Charge measured during charging | <2 min / 15 min | E-Scan free on its tools | Independent workshops | Large corporate |
| Altelium (UK) | Data platform plus test; insurance-backed warranty | n/a | n/a | Dealers, consumers, insurers | n/a |
| Recurrent (US) | Cloud telematics (connected car) | continuous | Free to owners; dealer subscription | US dealers, marketplaces, Experian | ~$24M |
| TWAICE (DE) | Cloud analytics / digital twin | continuous | enterprise | OEMs, BESS | ~$105M + €24M EIB debt |
| volytica (DE) | Cloud analytics (vdx) | continuous | enterprise | E-bus, leasing, insurers, Webfleet | ~$8M; ~25 staff |
| Elysia (UK) | Embedded BMS plus cloud digital twin | continuous | enterprise | JLR, mining, BESS | Fortescue-owned |
| Accure (DE) | Cloud AI analytics | continuous | enterprise | Transit (BVG, NYCT), BESS | ~$34.6M |
| Geotab/Samsara | Fleet telematics | continuous | telematics subscription | Fleets | Large |

### Inferences
- **The basic "BMS read-out certificate" for passenger cars is becoming a commodity:**
  - Mahle gives E-Scan away free on its tools.
  - Generational charges from £28.50 and Aviloo €35 per B2B test.
  - Moba's consumer kit cost €29–49.
  - OEMs (Renault, Stellantis, Tesla) produce their own readings.

  A solo founder selling another plug-in certificate in Luxembourg would face falling prices and entrenched distribution.
- **Differentiation is moving from measurement to guarantees and distribution.** Examples: Aviloo's free warranty, Altelium's Lloyd's-underwritten cover, and Generational's 6,000-workshop channel. A solo founder cannot easily underwrite warranties.
- **Fleet and operating-data analytics (TWAICE, volytica, Accure, Elysia) is B2B enterprise software.** Sales cycles are long and it is aimed at buses, storage and OEMs. Well-funded German players dominate it.
- **Europe has no Recurrent-style consumer or dealer battery score built from telematics.** Recurrent appears US-only. The European APIs (Smartcar, Enode, Mobilisights) mostly expose SoC, not SoH. This is a possible software gap (see Section 4).
- The EVS38/BOVAG study and the CARA scheme suggest that being CARA-approved is effectively the ticket into European remarketing channels such as Ayvens.

### Gaps
- Recurrent's "additional $4.5M (April 2026)" could not be verified; treat it as unconfirmed.
- No public current pricing was found for Moba CertifyPro (B2B), DEKRA, Carly, Altelium, Recurrent (dealer subscription) or Mahle E-HEALTH Charge.
- Nothing was found on getbatteryreport, Amodo, Battery ID, Spiral BatteryCheck or "Eletrified". Nuvve and Voltaware do not appear to be SoH assessment players (Nuvve is V2G charging and Voltaware is home-energy monitoring, from general knowledge that was not re-verified in this session).
- Elysia's Zitara acquisition date and terms were not confirmed.
- Aviloo's warranty country count conflicts (24 vs 26) between sources in Sept 2026.
- Generational's and Moba's funding amounts and headcounts were not found.
- Full-text verification of electrive and Forbes articles was not possible (fetch blocked).

---

## 2. What OEMs themselves offer (in-car SoH display, OEM battery certificates)

### Takeaway
OEMs are moving quickly to own the SoH number. Renault and Stellantis issue certificates; Tesla added an in-car test in 2025 and then partly withdrew it; VW, Hyundai and Kia issue dealer-tool reports. From Sept 2026 in France, Renault, Stellantis and Aramis Auto have pledged to show SoH in every used-EV ad. Regulation will require in-vehicle SoH monitors (Euro 7 / UN GTR 22, new types from Nov 2026) and a battery passport (Feb 2027). OEM coverage is still patchy, though: it varies by brand, is often locked to dealers, and is sometimes paid or time-limited.

### Cited Findings
- **Renault/Dacia**:
  - A "Certificat de batterie" based on BMS SoH is available in the MY Renault app and in "Easy Connect for Fleets". It covers connected EVs (ZOE E-Tech, Kangoo 33 kWh, Twingo Electric, Dacia Spring) — [Caradisiac](https://www.caradisiac.com/renault-invente-le-certificat-de-batterie-pour-mieux-vendre-son-electrique-d-occasion-191887.htm); [Automobile Propre](https://www.automobile-propre.com/articles/voiture-electrique-renault-lance-un-certificat-batterie-pour-faciliter-la-revente/)
  - Price conflict: one summary says the certificate is **paid and valid only 3 months** — [Moba blog on Renault certificate](https://get-moba.com/le-certificat-batterie-de-renault/). L'Argus reports a **free** Renault-Dacia battery-health app — [L'Argus](https://www.largus.fr/actualite-automobile/renault-dacia-bilan-de-sante-des-batteries-via-une-appli-gratuite-10715396.html). **This conflict is unresolved.**
- **Stellantis / Spoticar (UK)**: an SoH certificate comes with every used EV sold, alongside an 8-year/100,000-mile battery warranty from new — [Spoticar UK](https://www.spoticar.co.uk/used-cars/erase-your-doubts-electric) **[Vendor]**
- **France "pacte de confiance" (from 4 Sept 2026)**: Renault, Stellantis and online retailer Aramis Auto commit to show SoH % systematically on used-EV listings and sales documents. Private sellers and smaller non-signatory dealers are **not** bound. The French used-EV market grew 30% to 179,000 units in 2025 — [Économie Matin](https://www.economiematin.fr/voiture-electrique-etat-sante-batterie); [Automobile Propre](https://www.automobile-propre.com/articles/acheter-une-voiture-electrique-doccasion-va-devenir-plus-rassurant-grace-a-cette-nouvelle-obligation/); [L'Énergeek, 9 Sept 2026](https://lenergeek.com/2026/09/09/voiture-electrique-voitures-electriques/) **[Trade press]**
- **Tesla**:
  - In-car "Battery Health Test" (Controls > Service > Battery Health) arrived in software 2025.8.3 (March 2025) and recalibrates the range display. It covers Model 3/Y and 2021+ Model S/X — [Not a Tesla App](https://www.notateslaapp.com/news/2607/how-to-check-tesla-battery-health-degradation); [Shop4Tesla](https://www.shop4tesla.com/en/blogs/news/tesla-battery-health-test-update)
  - It was then **quietly removed for many vehicles in 2025.26** — [Not a Tesla App](https://www.notateslaapp.com/news/2988/tesla-quietly-removes-battery-health-test-for-many-in-update-202526) **[Trade press]**
- **VW Group** (VW/Audi/Skoda/Cupra): an official SoH certificate needs a dealer with the ODIS tool; the infotainment shows only estimated range. Some VW Group and Stellantis models show only a rough battery indicator — [Autodoc blog](https://www.autodoc.co.uk/info/how-to-check-ev-battery-health-soh) **[Low-quality]**. Owner forums report dealers issuing ID.3 certificates, but with friction, and a UK dealer (Arnold Clark) saying it could not provide battery health — [VW ID Forum](https://www.vwidtalk.com/threads/id-3-battery-health-certificate.16119/) **[Anecdotal]**
- **BMW (US certified pre-owned)**: 8-year/100,000-mile battery guarantee, with SoH protected at 75% rather than the usual 70% — [BMW USA](https://www.bmwusa.com/certified-preowned-all-electric.html) **[Vendor]**
- **Hyundai/Kia**:
  - Dealer GDS tools produce SoH reports with cell balance, reportedly for about €30–60 — [iEVChina guide](https://ievchina.com/insights/ev-battery-health-check-soh-guide/) **[Low-quality]**
  - Kia is trialling a **cell-level battery passport** (EV3 with Dukosi cell monitoring) in Germany and plans to offer it on all EVs and hybrids in Europe by Feb 2027 — [electrive, 10 Oct 2025](https://www.electrive.com/2025/10/10/kia-runs-cell-level-battery-passport-trial-in-europe/)
- **Regulation forcing OEM disclosure**:
  - **Euro 7 / UN GTR 22**: requires in-vehicle monitors of "State of Certified Energy/Range" and minimum durability of 80% at 5 years/100,000 km and 70% at 8 years/160,000 km. Monitor accuracy is checked by in-use verification. Applies from **29 Nov 2026 to new M1/N1 types** — [EUR-Lex summary](https://eur-lex.europa.eu/EN/legal-content/summary/vehicle-emissions-and-battery-durability-euro-7-technical-requirements-and-certification-rules.html); [HORIBA](https://www.horiba.com/int/mobility/applications/emissions-performance-and-durability/exhaust-emissions/gtr-no22/) (dates from search summary; verify on EUR-Lex)
  - **EU Battery Regulation 2023/1542**: Article 14 requires the BMS to hold SoH and related parameters, with **read-only access for independent operators**. The **battery passport** is mandatory from **18 Feb 2027** for EV batteries, light-means-of-transport (LMT) batteries and industrial batteries over 2 kWh — [Codibly](https://codibly.com/blog/articles/eu-battery-regulation-passport-bess-operators); [Circularise](https://www.circularise.com/blogs/eu-battery-passport-regulation-requirements) **[Secondary]**
- **National moves in Benelux**:
  - **Belgium Car-Pass**: SoH % can appear on the official Car-Pass from Jan 2026, **voluntarily** and only if the seller agrees — [Car-Pass](https://www.car-pass.be/en/blog/soh-battery-second-hand-electric-cars); [newmobility.news, 24 Oct 2025](https://newmobility.news/2025/10/24/belgiums-car-pass-pilots-battery-health-checks-before-eu-takes-over/)
  - **Netherlands**: SoH checks are not mandatory. The Climate Agreement committed the government, ANWB, BOVAG, RAI and VER to a uniform battery check — [search summary of BOVAG/sector sources](https://www.automotive-online.nl/management/occasions/2022/06/17/analyse-vooral-autofabrikanten-frustreren-batterijcheck-ev-occasions/). A 2022 analysis argued that OEMs were "frustrating" independent battery checks — [Automotive Online, 17 Jun 2022](https://www.automotive-online.nl/management/occasions/2022/06/17/analyse-vooral-autofabrikanten-frustreren-batterijcheck-ev-occasions/)

### Inferences
- From about 2027, a basic SoH number will increasingly come from the car or OEM for free (GTR 22 monitors, the battery passport, OEM apps, the French pacte). This erodes demand for pure read-out certificates on **new-generation** vehicles.
- Two groups remain under-served:
  - The **2015–2023 installed base**, where OEM monitors are absent or inconsistent.
  - **Cross-brand verification**: an independent check of whether the OEM's own number can be trusted (see Section 3).
- OEM certificates are brand-locked. A multi-brand fleet or leasing company still needs a neutral layer that normalises results across brands.

### Gaps
- Exact current OEM certificate prices and availability by country (BMW Europe, Mercedes, Hyundai/Kia Europe, VW) were not confirmed; the search budget ran out before BMW and Mercedes checks.
- Whether the Renault certificate is free or paid in 2026 is unresolved.
- The Euro 7 application dates should be checked against the EUR-Lex text.

---

## 3. Accuracy disputes, independent evidence and standardisation

### Takeaway
The only substantial independent head-to-head test is BOVAG/VER in the Netherlands (Dec 2024, also presented at EVS38 in 2025). It ranked Aviloo FLASH and Moba as most reliable, Bosch as less consistent, and Mahle and Hella Gutmann as untestable on the data available. It still advises using OEM tests for warranty claims. A March 2026 arXiv study of 1,114 fleet EVs challenges whether BMS-reported SoH (the basis of most quick tests) is meaningful at all. CARA's standard certifies the *process* of reading the BMS rather than the *accuracy* of the number.

### Cited Findings
- **BOVAG + VER (Dutch Association of Electric Drivers) study, 19 Dec 2024** **[Independent]** — [BOVAG press release](https://www.bovag.nl/pers/persberichten/onderzoek-betrouwbaarheid-batterijtesten-tweedehands-elektrische-autos); [Automotive Online](https://www.automotive-online.nl/werkplaats/2024/12/19/onderzoek-batterijtesten-moba-en-aviloo-scoren-het-hoogst-bosch-minder/); [report PDF](https://vmn-amt.imgix.net/uploads/2024/12/batterijtesten-bovag-ver-12-2024.pdf)
  - 185 qualitative and quantitative test rounds on 24 brands and models, representing 83.2% of NL EVs aged 4–8 years.
  - Aviloo FLASH and Moba gave the most reliable picture, matching manufacturer tests closely.
  - Bosch gave a "reasonable" picture but lacked their consistency.
  - Data on Mahle and Hella Gutmann was too limited to judge.
  - For warranty situations, BOVAG/VER advise that an **official manufacturer test should be the leading document**.
- **EVS38 paper "The Reliability of Independent Battery Health Tests for Used BEVs"** (proceedings dated 18 Jun 2025) evaluated the same five providers (Aviloo, Bosch, Hella Gutmann, Mahle, Moba). It concluded that Aviloo FLASH and Moba are "the most reliable, scalable, and consumer-friendly" — [EVS38 PDF](https://evs38-program.org/images/Proceedings/B%20Policy%20&%20Society/434_The%20Reliability%20of%20Independent%20Battery%20Health%20Tests%20for%20Used%20Battery%20Electric%20Vehicles.pdf) **[Independent; full text not fetched]**
- **arXiv 2603.21592 (March 2026), "Battery health reporting fails independent validation across manufacturers"** **[Independent, preprint, not peer-reviewed]** — [arXiv](https://arxiv.org/pdf/2603.21592)
  - Presented as the first cross-manufacturer validation of BMS SoH against a benchmark independent of the manufacturer.
  - Data: 1,114 fleet EVs (Hyundai, Kia, Genesis, Audi, VW) with about 375 days of telematics.
  - Uses a BMS-independent capacity protocol based on constant-current charging segments.
  - Argues that the EU Battery Regulation and California ACC II "implicitly assume that reported SOH is meaningful — an assumption this data challenges directly".
  - Specific error magnitudes could not be retrieved because fetching was blocked.
- **Disputes and anecdotes:**
  - A Porsche Taycan owner saw BMS SoH of 84% against Aviloo FLASH of 91% — [TaycanForum](https://www.taycanforum.com/forum/threads/bms-soh-84-vs-independent-aviloo-flash-91.35340/)
  - A VW ID owner reported a "disappointing" Aviloo result — [VW ID Forum](https://www.vwidtalk.com/threads/did-the-aviloo-test-with-a-disappointing-result.13772/)
  - Owners argue that BMW uses net vs gross capacity differently — [Powertrain International](https://www.powertraininternationalweb.com/sustainability/soh-aviloo-battery/) **[Anecdotal]**
  - Aviloo's CEO says some clients' SoH results (e.g. 68%) were eventually accepted by OEMs in warranty disputes — same source **[Vendor]**
- **"SoH is not always SoH"**: TÜV SÜD and Aviloo both publish explainers saying reference values differ (gross vs net vs type-approved usable energy) and that there is no standard test procedure — [TÜV SÜD](https://www.tuvsud.com/en/knowledge-hub/technical-updates/automotive-essentials/health-status-of-a-battery); [Aviloo fact-check](https://aviloo.com/files/Aviloo/content/pdf/PM_Faktencheck_SOH_engl.pdf). "There is still no standard for determining the SoH… everyone can do it differently" — [search summary of TÜV SÜD / Autovista material](https://www.tuvsud.com/en/knowledge-hub/technical-updates/automotive-essentials/health-status-of-a-battery)
- **CARA Battery Health Check standard (April 2023 regulations)**: the "Basic BHC" reports SoH % relative to the **type-approved usable battery energy**, generated or calculated from the car's own BMS and obtained with a diagnostic tool — [CARA regulation PDF](https://cara-europe.org/wp-content/uploads/2023/05/CARA-Europe-Battery-Health-Check-Regulations-28042023.pdf); [CARA](https://cara-europe.org/battery-health/). CARA-approved providers found: Aviloo FLASH, DEKRA SoH Report, Moba CertifyPro, Mahle E-Scan (Mar 2026), PKC, Generational and CertifyCar.
- The industry has been calling for a standard since at least 2023 — [Fleet News, 29 Mar 2023](https://www.fleetnews.co.uk/news/latest-fleet-news/electric-fleet-news/2023/03/29/call-for-industry-standard-electric-vehicle-battery-health-check)
- Independent consumer tests by ADAC, the AA or Which? comparing SoH services **were not found**. ADAC partners with Aviloo rather than testing it, and published a PHEV degradation study based on about 28,500 SoH tests across BMW, Ford, Mercedes, Mitsubishi, VW and Volvo — [auto motor und sport](https://www.auto-motor-und-sport.de/tech-zukunft/alternative-antriebe/adac-test-so-stark-altern-die-phev-batterien-von-mercedes-vw-bmw-co/) **[Trade press]**

### Inferences
- Most quick tests, including CARA-certified ones, ultimately rely on the car's **own BMS estimate**. If the arXiv findings hold, "independent" certificates that only read the BMS are not truly independent. That leaves room for a **measurement-based verification** product (e.g. analysing constant-current charging segments or a controlled charge) that audits the OEM number. It is technically feasible for a solo founder with battery expertise, but it needs validation data.
- BOVAG/VER's advice to rely on OEM tests for warranty claims shows that independent tests are not yet trusted in disputes. A "dispute or arbitration" service is a thin but real niche.

### Gaps
- Per-provider numeric error figures from the BOVAG/VER and EVS38 studies (e.g. mean absolute deviation) were not retrieved; the PDFs linked above should be read.
- The arXiv paper's quantitative results (how far BMS SoH deviates, and in which direction, per brand) were not retrieved.
- No ADAC, AA or Which? comparative test of SoH services was found; it may not exist.

---

## 4. Gaps and weaknesses a solo founder in Luxembourg could exploit

### Takeaway
**Crowded:**
- Plug-in SoH certificates for mainstream used passenger cars. Aviloo already serves Luxembourg through ACL (since 2021) and extended its free warranty to Luxembourg in Sept 2026. Moba reaches Benelux garages through TECH360 and GO Remarketing, and DEKRA is active across Benelux.
- Enterprise battery analytics for buses and storage (TWAICE, volytica, Accure, Elysia).

**Thinner gaps:**
1. A telematics-based SoH score for European SME fleets and leasing companies, with no test drive, sitting on top of OEM data APIs (Recurrent has no European equivalent).
2. Measurement-based verification or audit of OEM/BMS SoH.
3. Light electric vehicles (e-bikes, e-scooters) and the battery passport for LMT batteries from Feb 2027.
4. Commercial vans (LCVs) and older, low-value EVs where a €99–200 test is too expensive relative to the car.
5. Cross-border and multilingual remarketing data services for the Luxembourg, Belgium, France and Germany corridor.

### Cited Findings
- **Luxembourg is already covered by the market leader:**
  - ACL has offered the Aviloo test since 2021 and FLASH since 2023 — [Infogreen.lu](https://www.infogreen.lu/l-acl-lance-le-premier-test-independant-de-batterie-de-voiture-electrique.html); [ACL](https://www.acl.lu/en/mobility/vehicle-diagnostics/)
  - The Aviloo battery warranty extended to Luxembourg in Sept 2026 — [electrive, 8 Sept 2026](https://www.electrive.com/2026/09/08/aviloo-expands-battery-warranty-to-26-countries/)
- **Benelux channels are being locked up:**
  - Moba via TECH360 (Alliance Automotive Group Benelux) and GO Remarketing (NL/BE) — [AAG Benelux](https://www.allianceautomotivegroupbenelux.com/en/news/tech360-and-moba-join-forces-for-fast-and-reliable-ev-battery-diagnostics); [GO Remarketing](https://go-remarketing.com/services/state-of-health/)
  - DEKRA NL offers an EV battery test — [DEKRA NL](https://www.dekra.nl/en/ev-battery-test/)
  - Ayvens Carmarket certificates are live in NL, FR and DE — [Ayvens](https://www.ayvens.com/en-cp/news/newsroom/press-releases-2025/ayvens-carmarket-launches-battery-soh-certification-for-used-evs/)
  - Belgium's Car-Pass carries voluntary SoH from 2026 — [Car-Pass](https://www.car-pass.be/en/blog/soh-battery-second-hand-electric-cars)
- **Price pressure on the basic test:** Mahle E-Scan free on its tools (Mar 2026); Generational from £28.50; Aviloo B2B €35 plus a €480/yr licence — [Mahle](https://newsroom.mahle.com/press/en/press-releases/mahle-receives-cara-certification-for-battery-diagnostic-function-e-scan-112064); [AM-online](https://www.am-online.com/news/generational-adds-cell-level-ev-battery-testing-for-dealers); [Forbes](https://www.forbes.com/sites/jamesmorris/2026/07/29/how-aviloo-is-solving-the-used-ev-market-battery-health-trust-problem/)
- **Consumer tests are expensive relative to cheap EVs:** about €99 for Aviloo PREMIUM, around €100–200 for DEKRA/TÜV consumer tests per German aggregators — [WhichEV](https://www.whichev.net/2026/07/29/aviloo-premium-battery-test-2026-review/) **[Low-quality for DEKRA/TÜV figures]**
- **The telematics SoH layer is missing in Europe:**
  - Recurrent's telematics-based scoring is US-only — [Recurrent](https://www.recurrentauto.com/dealers/faq)
  - Smartcar exposes SoC, range and capacity but no SoH endpoint — [Smartcar docs](https://smartcar.com/docs/api-reference/evs/get-battery-level)
  - Mobilisights exposes "battery state" and SoC — [Mobilisights](https://www.stellantisfleet.com/mobilisights.html)
  - Geotab shows that fleet-scale degradation analytics from telematics is feasible (22,700 EVs) — [Geotab](https://www.geotab.com/blog/ev-battery-health/)
  - The arXiv 2026 paper shows a BMS-independent capacity estimate from constant-current charging segments in telematics data — [arXiv](https://arxiv.org/pdf/2603.21592)
- **Commercial vehicles and buses:** the used e-bus market is served by volytica with TÜV NORD (259 BYD buses) and by Accure (BVG, NYC Transit) — [volytica](https://www.volytica.com/Insights/tuv-nord-mobility-and-volytica-diagnostics-facilitate-the-largest-used-e-bus-transaction-of-europe-to-date/); [ACCURE](https://www.accure.net/news/accure-battery-intelligence-secures-16-million-to-scale-battery-safety-and-performance-offerings-across-europe-americas-and-asia-pacific)
- **Light EVs:**
  - The battery passport requirement covers **LMT (e-bike and e-scooter) batteries** from 18 Feb 2027 — [Codibly](https://codibly.com/blog/articles/eu-battery-regulation-passport-bess-operators)
  - Used e-bike SoH checks today depend on the system app or a dealer diagnostic printout (e.g. Bosch dealer tools) — [Upway](https://upway.co/blogs/news/how-can-i-check-the-battery-health-when-buying-a-used-e-bike); [DIN Calculator](https://www.dincalculator.com/bike/ebike-battery-health) **[Low-quality]**
  - Replacement batteries cost €300–700 — same source. **No independent multi-brand LEV SoH certificate provider was found.**
- **Second-life and stationary storage:**
  - The EU Battery Regulation sets SoH reporting and passport requirements for repurposed batteries; BMS access and fast diagnostics are key — [ScienceDirect](https://www.sciencedirect.com/science/article/pii/S2950264025000802); [EU Circular Economy Platform, May 2026](https://circulareconomy.europa.eu/platform/sites/default/files/2026-05/Overcoming%20challenges%20for%20second-life%20applications%20for%20battery%20packs.pdf)
  - Start-ups are developing grading that takes minutes (EIS plus ML, e.g. ReJoule) — [IDTechEx](https://www.idtechex.com/en/research-article/the-battery-comeback-second-life-ev-batteries/32996)
  - Storage-system analytics is contested by TWAICE, Accure and Elysia/Zitara.
- **Value evidence (weak):** claims that certified EVs sell for £450–900 more — [PAD Pontypridd blog](https://pontypridddiagnostics.co.uk/blog/ev-battery-certificate) **[Low-quality]**; each 1% of SoH lost cuts resale by 1.2–2.0% — [Oxmaint](https://oxmaint.com/industries/fleet-management/fleet-ev-battery-health-monitoring-guide-2026) **[Low-quality]**; tested BEVs "sold 4 days faster" — [Generational](https://www.renewableenergymagazine.com/electric_hybrid_vehicles/generational-rolls-out-ev-battery-testing-technology-20260119) **[Vendor]**
- **Regulatory tailwinds** that create demand for independent verification around 2026–2027:
  - France's pacte (Sept 2026) — [Économie Matin](https://www.economiematin.fr/voiture-electrique-etat-sante-batterie)
  - Belgium's Car-Pass (Jan 2026) — [Car-Pass](https://www.car-pass.be/en/blog/soh-battery-second-hand-electric-cars)
  - Euro 7 SoH monitors (Nov 2026) — [EUR-Lex](https://eur-lex.europa.eu/EN/legal-content/summary/vehicle-emissions-and-battery-durability-euro-7-technical-requirements-and-certification-rules.html)
  - Battery passport with read-only BMS access for independent operators (Feb 2027) — [Codibly](https://codibly.com/blog/articles/eu-battery-regulation-passport-bess-operators)

### Inferences
1. **Avoid competing head-on** with Aviloo, Moba or DEKRA on dealer plug-in certificates in Luxembourg. They have the distribution (ACL, TECH360, Ayvens), CARA approval and, in Aviloo's case, free warranties and €30M of capital.
2. **The most plausible solo-founder gap is software, not hardware:** a "Recurrent for Europe", i.e. a battery-health layer for fleets and leasing that needs no test drive. It would combine OEM data APIs (High Mobility, Smartcar, Mobilisights) with an independent capacity estimate from charging sessions (the arXiv-style constant-current method). The product would be continuous SoH trends plus a remarketing certificate at end of lease. Luxembourg is a relevant launch market because leasing companies and fleet-heavy corporates are dense there (to be confirmed by the market-sizing research). Risks:
   - OEM API costs and coverage.
   - OEMs moving into the same space (Mobilisights, GTR 22 monitors).
   - Established players (Aviloo, volytica, Geotab) could add this feature.
3. **An audit or verification service** positioned as a check on OEM SoH, using the arXiv evidence that BMS SoH can fail independent validation, for disputes, warranty claims and the battery-passport era. It is niche and depends on credibility, so it would need partnership with a lab or university (e.g. University of Luxembourg or LIST).
4. **LEV and e-bike battery certification** ahead of the Feb 2027 LMT battery passport requirement. It is fragmented, brand-locked and lower-ticket, and no independent multi-brand player was found. However, per-test value is low (replacement €300–700), so this needs a cheap, scalable tool (app plus BLE/charger-side measurement).
5. **LCV and e-van remarketing** for Benelux fleets: no LCV-specific offer was found, but coverage of vans by Aviloo or Moba was not verified. Risky as a standalone business.
6. **Low-value older EVs** (ZOE, Leaf, i3, e-Golf): a sub-€20 consumer test could fill a price gap, but LeafSpy and cheap apps already exist and willingness to pay is doubtful.

### Gaps
- No data was found on Luxembourg-specific used-EV volumes, leasing share, or whether SNCT (the Luxembourg vehicle inspection body) or DEKRA Luxembourg offer SoH tests; the search budget ran out before the SNCT query.
- Coverage of LCV models (e-Transit, e-Sprinter, Stellantis vans) by the quick-test providers was not verified.
- No evidence was found for forklift or industrial-truck SoH services; they are presumably handled by OEMs (Jungheinrich, Linde, etc.), but this is unverified.
- No independent evidence was found on willingness to pay for a telematics-based SoH score in Europe.

---

## 5. Consolidation, acquisitions, pivots and failures, 2023–2026

### Takeaway
There were no outright acquisitions of used-car SoH test providers. The main shake-out was the **closure of the TÜV Rheinland/TWAICE "Battery Quick Check" joint venture (Feb 2025)**, with TWAICE retreating to OEM and storage work. Capital is concentrating in Aviloo (€30M, Feb 2026) and in storage-focused analytics (TWAICE €24M EIB debt, Accure $16M). Scan-tool incumbents such as Mahle are commoditising the basic test.

### Cited Findings
- **Battery Quick Check (TÜV Rheinland + TWAICE JV)**: launched Sept 2023 and discontinued on **28 Feb 2025**. Hella Gutmann took over the name from 1 Mar 2025 to run a new version directly on its diagnostic devices. TÜV Rheinland is refocusing on testing and measurement; TWAICE is returning to "battery analytics and simulations for car manufacturers and operators of stationary energy storage" — [electrive.net, 3 Feb 2025](https://www.electrive.net/2025/02/03/tuev-rheinland-gibt-battery-quick-check-weiter/); [kfz-betrieb](https://www.kfz-betrieb.vogel.de/tuev-rheinland-stellt-seinen-batterietest-ein-a-8f943596a32829b7bbd917ab685ea128/); [auto.news](https://auto.news/artikel/hella-gutmann-solutions-uebernimmt-quick-battery-check-vom-tuev-rheinland) **[Trade press]**
- **Aviloo**: €30M from Armira Growth (Feb 2026); the EIC Fund was bought out in a shareholder reshuffle — [electrive, 11 Feb 2026](https://www.electrive.com/2026/02/11/battery-diagnostics-specialist-aviloo-secures-e30-million/). Then warranty launched (Jun 2026) and expanded to 24–26 countries (Sept 2026) — [electrive](https://www.electrive.com/2026/09/08/aviloo-expands-battery-warranty-to-26-countries/)
- **TWAICE**: €24M EIB venture debt (5 Feb 2026), with the BESS business nearly tripling in 2025 — [EIB](https://www.eib.org/en/press/all/2026-045-eib-invests-eur24-million-in-twaice-to-accelerate-the-energy-transition-with-predictive-battery-analytics)
- **ACCURE**: $16M Series B (Feb 2025) — [FinSMEs](https://www.finsmes.com/2025/02/accure-battery-intelligence-raises-16m-in-series-b-funding.html)
- **Recurrent**: $16M Series A (Jan 2024) — [GeekWire](https://www.geekwire.com/2024/seattle-startup-recurrent-raises-16m-aims-to-be-standard-for-scoring-used-ev-batteries/). A reported extra $4.5M (Apr 2026) is unverified.
- **volytica**: €5.5M (Sept 2023) — [EU-Startups](https://www.eu-startups.com/2023/09/dresden-based-volytica-closes-e5-5-million-to-refine-battery-analytics-ahead-of-new-era-of-electrification/)
- **Elysia (Fortescue)** acquired Zitara, a BESS analytics company (date not confirmed) — [Solar Power Portal](https://www.solarpowerportal.co.uk/battery-storage/fortescue-s-uk-battery-intelligence-platform-adds-onsite-storage-controls-company-zitara)
- **Rebrand**: Batteries for People / "La Belle Batterie" became **Moba** to go international — [Journal Auto](https://journalauto.com/services/batteries-for-people-devient-moba/)
- **Commoditisation moves**: Mahle made E-Scan free on its tools (Mar 2026) — [Mahle](https://newsroom.mahle.com/press/en/press-releases/mahle-receives-cara-certification-for-battery-diagnostic-function-e-scan-112064). Tesla added an in-car test (Mar 2025) and then removed it for many cars (2025.26) — [Not a Tesla App](https://www.notateslaapp.com/news/2988/tesla-quietly-removes-battery-health-test-for-many-in-update-202526)
- **Vertical integration by marketplaces**: Cox Automotive built VIN-level battery health into Manheim (Mar 2024) — [Cox Automotive](https://www.coxautoinc.com/insights-hub/cox-automotive-deploying-industry-first-vin-specific-ev-battery-health-solution-across-manheim-locations/). Ayvens Carmarket adopted CARA-accredited certificates (Sept 2025) — [Ayvens](https://www.ayvens.com/en-cp/news/newsroom/press-releases-2025/ayvens-carmarket-launches-battery-soh-certification-for-used-evs/)
- **Wider battery-sector failures** (context only; none is an SoH assessment player): Ample, battery swapping, filed for bankruptcy Dec 2025; 24M Technologies shut down; Ascend Elements filed Chapter 11 on 9 Apr 2026 — [Battery Tech Online](https://www.batterytechonline.com/automotive-mobility/12-battery-ev-companies-that-have-filed-for-bankruptcy); [Boston Globe, 26 Mar 2026](https://www.bostonglobe.com/2026/03/26/business/ev-battery-startup-24m-ses-factorial/)

### Inferences
- The failure of a joint venture between an inspection giant and a well-funded analytics company suggests that **standalone used-car SoH testing is a hard business at low price points**. Distribution and bundling matter more than algorithms. Winners either own a channel (Aviloo through ADAC/ACL/OEM dealers; Generational through Maverick) or bundle into tools they already sell (Mahle, Hella Gutmann).
- Venture money in 2025–2026 went mainly to (a) the category leader, Aviloo, and (b) storage analytics (TWAICE, Accure, Elysia). This signals that investors see the passenger-car certificate market as consolidating around one or two leaders.
- An exit route for a small specialist could be acquisition by a scan-tool maker, an inspection body or a remarketing platform. However, no acquisition of an SoH test startup was found in 2023–2026.

### Gaps
- No acquisitions of SoH test providers (Aviloo, Moba, Generational, Altelium, volytica) were found; a search on "battery analytics startup acquired 2025" returned none.
- Status of Nuvve (a V2G company, likely irrelevant to SoH) was not checked; the search budget was exhausted.
- Whether Recurrent, Altelium or Moba had layoffs or restructurings in 2025–2026 was not researched.
