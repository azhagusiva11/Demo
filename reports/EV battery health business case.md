# Sell battery verification, not another certificate

**Verdict: don't build a general EV battery-health certificate business from Luxembourg. A narrow service that verifies and tracks battery health for fleets and lessors is a reasonable low-cost bet, but only if it lands a paying pilot within about 12 months.** Paying demand is real and growing. Used battery-electric car (BEV) sales are rising 30–50% a year in Europe's biggest markets. Leasing majors and auction houses (Ayvens, Arval, BCA, Copart) now certify ex-fleet EVs because a battery grade lifts the sale price by about 1.4% and sells the car nearly three days faster. That demand has already been captured and commoditised, though. Incumbents sell business tests for about €35, and Mahle gives an approved read-out away free on its workshop tools. Aviloo has sold through Luxembourg's auto club ACL since 2021 and now includes a free €3,000 battery warranty with its quick test, in Luxembourg too. Luxembourg on its own releases only a few thousand fleet BEVs a year, too few to live on even if you tested every one. The gap you can defend is **measuring battery capacity independently, to check the figure the car's battery management system (BMS) reports**. A March 2026 study of 1,114 fleet EVs found that this BMS figure fails independent validation. You would sell the measurement to fleets and lessors in the Greater Region (Luxembourg and neighbouring parts of France, Germany and Belgium) that must decide which cars to sell, re-lease or dispute. With your CAN, Python and MATLAB skills you can build it to a defensible ±3–5% on two or three vehicle platforms in 3–6 months, with about €1,000 of hardware and €5–12k of total cash. The hard parts are reference data, credibility and sales, not algorithms. Expect a small, profitable specialist business rather than a venture exit. The environmental payoff is real but indirect: measured batteries average 93–95% health, so trustworthy reports mainly keep good EVs on the road instead of being sold at a discount. Most facts here come from search-result summaries rather than full page reads, and the figures that decide the plan are listed for verification at the end.

## Paying demand is real, but it sits with a few fleet sellers

Used-EV volumes are now large enough to support a testing industry:

| Market | 2025 used-BEV sales | Share of used market | Source |
|---|---|---|---|
| UK | 274,815 (+45.7%) | 3.5% | [Motor Trade News/SMMT](https://www.motortradenews.com/used-cars/used-car-market-grows-2-2-in-2025-smmt/) |
| France | 178,879 (+30.3%) | not given | [Auto Infos/AAA Data](https://www.auto-infos.fr/article/avec-pres-de-180-000-ventes-en-2025-la-voiture-electrique-d-occasion-trouve-son-public.290144) |
| Netherlands | 45,726 in the first half alone | not given | [BOVAG](https://www.bovag.nl/nieuws/occasionverkoop-groeit-verder-in-eerste-halfjaar-2025) |
| Germany | about 189,000 ownership changes, Jan–Oct (source page not confirmed) | not given | [DAT Barometer](https://www.dat.de/barometer/juli/) |

Together that is roughly **0.75–0.8 million transactions across four markets**, about twice the US total of 378,140 ([Cox Automotive](https://www.coxautoinc.com/insights/ev-market-monitor-december-2025/)). Supply will keep growing. The EU registered **1.88 million new BEVs in 2025** ([ACEA](https://www.acea.auto/pc-registrations/new-car-registrations-1-8-in-2025-battery-electric-17-4-market-share/)). UK leasing companies report "heavy losses" as the 2022 fleet cohort returns from lease ([Business Car](https://www.businesscar.co.uk/news/many-bvrla-members-expect-continued-ev-rv-decline-ceo-says-government-prioritises-manufacturers/)). Arval says only about 5% of the used vehicles it sold in 2025 were BEVs ([Arval](https://www.arval.com/arval-2025-full-year-results)), so lessors' exposure to battery risk has barely begun.

The buyers who pay are sellers holding many EVs, not private buyers:

| Buyer | Evidence they pay | Price signal |
|---|---|---|
| Leasing companies at defleet | Ayvens Carmarket has certified ex-lease BEVs since Sept 2025. It uses BMS readings from providers accredited by CARA, the European Car Remarketing Association ([Ayvens](https://www.ayvens.com/en-cp/news/newsroom/press-releases-2025/ayvens-carmarket-launches-battery-soh-certification-for-used-evs/)). Arval uses Moba and Aviloo ([Fleet Europe](https://www.fleeteurope.com/en/remarketing/europe/features/ev-battery-health-still-93-after-70000-km-arval-study-shows)) | No public contract prices |
| Auctions and remarketers | BCA grades with Aviloo Flash ([BCA](https://www.bca.co.uk/news/bca-introduces-ev-battery-health-grading-to-the-remarketing-sector-20241030/)). Copart UK uses Aviloo ([ATF Pro](https://atfpro.co.uk/2026/07/17/introducing-coparts-ev-battery-health-report/)). SVA uses Generational ([Motor Trader](https://www.motortrader.com/motor-trader-news/automotive-news/sva-appoints-battery-health-check-partner-03-06-2026)) | BCA reports +£258 (1.4%) and 2.7 days faster across 22,000+ cars ([Business Car](https://www.businesscar.co.uk/news/bca-claims-success-from-ev-battery-health-data-service/)) |
| Dealers | mobile.de listings carrying a certificate rose from under 5% to over 20% in about 18 months ([heise](https://www.heise.de/news/Batteriezertifikate-fuer-Elektroautos-Manchmal-nun-Pflicht-bei-mobile-de-11072672.html)) | From £28.50 per test (Generational) to €35 plus a €480 yearly licence (Aviloo) |
| Private buyers and sellers | ADAC and ACL resell Aviloo's drive-down test | €79 (Moba kit) to €99 (Aviloo Premium) ([Moba](https://get-moba.com/produit/kit-de-certification/); [Aviloo](https://help.aviloo.com/help/de-de/28-was-kostet-der-aviloo-premium-batterietest/12-was-kostet-der-aviloo-premium-batterietest)) |
| Big platforms and carmakers | Cox builds battery scores in-house for Manheim ([Cox](https://www.coxautoinc.com/insights-hub/cox-automotive-deploying-industry-first-vin-specific-ev-battery-health-solution-across-manheim-locations/)). Spoticar and Polestar bundle certificates with their used cars | Free to the end user, which erodes paid tests |
| Lenders and insurers | No evidence found either way | None |

The evidence that certificates raise prices is thinner than vendors claim:
- **BCA's data** on more than 22,000 graded cars is the best real-transaction evidence available, and it shows a gain of about 1.4%. It comes from a scheme the vendor runs.
- **Aviloo** says buyers pay €550–1,100 more per car ([Aviloo](https://aviloo.com/en-us/aviloo-certified)). That is the vendor's own study.
- **heise** found asking prices "nearly 20%" higher for certified cars on mobile.de ([heise](https://www.heise.de/hintergrund/Gebrauchte-Elektroautos-Zertifikate-fuer-Batterien-kommen-nur-zoegerlich-9710626.html)). That comparison did not control for age or mileage.

The effect is modest because most batteries are fine. Arval measured **93% average battery health (state of health, SoH) after 70,000 km** ([Fleet Europe](https://www.fleeteurope.com/en/remarketing/europe/features/ev-battery-health-still-93-after-70000-km-arval-study-shows)). EV resale values did collapse: UK EVs up to two years old kept 47% of their new price in April 2025, against 83% in 2022 ([Fleet News](https://www.fleetnews.co.uk/news/used-electric-vehicles-lose-half-their-value-due-discounts-on-new-cars)). The main cause was price cuts on new cars, not battery wear. A certificate removes the discount buyers apply for uncertainty, not the structural fall in values, so sell it as faster sales and lower risk.

That is also where the environmental benefit comes from. **64% of UK consumers say battery worries would stop them buying a used EV** ([Auto Trader plc](https://plc.autotrader.co.uk/news-views/press-releases/retailers-could-unlock-even-more-ev-sales-with-battery-health-info/)), and only 3% feel confident doing so ([Electrifying.com](https://www.electrifying.com/blog/article/electric-groups-call-for-used-battery-health-checks)). Anything that replaces that fear with a trustworthy number keeps healthy EVs in second and third ownership.

Regulation is pushing SoH into every sale, but it is also making the bare number free:

| Driver | What it does | Date | Source |
|---|---|---|---|
| EU Battery Regulation, Article 14 | Every EV's BMS must hold up-to-date SoH data. For EVs, SoH is defined as the state of certified energy (SOCE, the usable energy left as a share of the certified figure) under the UN rule GTR 22. The battery's purchaser, or a third party acting for them, gets read-only access to it, including for "evaluating the residual value" | Since 18 Aug 2024 | [Battery Pass Content Guidance](https://github.com/batterypass/BatteryPassDataModel/blob/main/docs/1.2/2023_Battery_Passport_Content_Guidance.pdf) |
| Euro 7 | On-board SOCE monitors become mandatory, readable through the diagnostic (OBD) port or over the air. Batteries must keep at least 80% after 5 years or 100,000 km, and 72% after 8 years or 160,000 km | New car types from **29 Nov 2026**; all new cars from **29 Nov 2027** | [IDIADA](https://www.digitalsolutions.applusidiada.com/blogs/news/eu-publishes-new-euro-7-regulation-for-vehicle-emissions-and-battery-durability); [HORIBA](https://www.horiba.com/usa/mobility/applications/emissions-performance-and-durability/exhaust-emissions/gtr-no22/) |
| Battery passports | Digital passports carrying SoH | **18 Feb 2027**, for batteries placed on the market from then | [Automotive IQ](https://www.automotive-iq.com/electrics-electronics/articles/eu-battery-passport-explained-requirements-timeline-and-compliance-steps-to-2027) |
| mobile.de | Dealers who advertise a certificate must upload it | Since 1 Nov 2025 | [heise](https://www.heise.de/news/Batteriezertifikate-fuer-Elektroautos-Manchmal-nun-Pflicht-bei-mobile-de-11072672.html) |
| Belgian Car-Pass | The mandatory used-car history document can show SoH, on a voluntary basis | Since Jan 2026 | [Car-Pass](https://www.car-pass.be/en/blog/soh-battery-second-hand-electric-cars) |
| French industry pledge | Renault, Stellantis and Aramis Auto commit to show SoH on every used-EV listing | Sept 2026 | [Économie Matin](https://www.economiematin.fr/voiture-electrique-etat-sante-batterie) |

No EU or Luxembourg rule was found that forces sellers to disclose SoH. The net effect of these rules is that value moves from *reading* a percentage to *checking that the percentage is right*. GTR 22 allows the on-board monitor to be off by about 5 points ([MDPI Batteries](https://www.mdpi.com/2313-0105/9/9/454)), roughly 3 kWh on a 60 kWh pack. Cars built before these rules, roughly 2015 to 2027, have no regulated monitor at all.

Luxembourg is too small to be the market on its own:
- **New BEVs:** 12,664 were registered in 2025, a 26.9% share. The outlets reporting these figures are not individually confirmed ([Le Quotidien](https://lequotidien.lu/a-la-une/autofestival-2026-quels-sont-les-chiffres-cles-du-marche-de-lautomobile/)).
- **Company cars:** they make up 54% of new registrations ([Leasys](https://www.leasys.com/lu/english/blog/leasing_company_cars_in_luxembourg:_a_turning_point_in_2025)).
- **Used-EV subsidy:** the state pays €1,500 towards a used BEV ([EV TCP](https://evtcp.org/country/luxembourg/)).
- **Used market:** it is thin. An older snapshot, probably from 2024, counted about 1,274 EVs for sale on Luxauto ([Luxauto](https://www.luxauto.lu/blog/en/car-news/study-of-the-second-hand-market-in-luxembourg/)). Ex-lease cars are exported through business-to-business platforms such as eCarsTrade ([eCarsTrade](https://ecarstrade.com/countries/luxembourg)).

My rough estimate of the local market runs as follows. Assume about half of those BEVs are fleet cars on 3–4-year terms. Then some 3,000–7,000 BEVs a year leave Luxembourg fleets in 2026–2029. Testing every one of them at €30–100 would be worth only **about €0.1–0.7 million a year in total**. Earning €60,000 of gross margin would take roughly 2,000 business tests at €30, which is 30–65% of that entire flow. That is not realistic for a newcomer competing with ACL and Aviloo. A Luxembourg business therefore has to sell software, sell across the Greater Region (Lorraine, Saarland, Trier, Wallonia), or both.

## Head-on, you face a €35 test bundled with a €3,000 warranty

Aviloo is the incumbent to beat, and it is already in your market:
- **Funding and scale:** it raised about **€30 million in February 2026** and claims more than 750 customers and 500,000 tests ([electrive](https://www.electrive.com/2026/02/11/battery-diagnostics-specialist-aviloo-secures-e30-million/)).
- **Local channel:** it has sold through ACL in Luxembourg since 2021 ([Infogreen.lu](https://www.infogreen.lu/l-acl-lance-le-premier-test-independant-de-batterie-de-voiture-electrique.html)).
- **Business pricing:** it reportedly charges a €480 annual licence per test box plus €35 per three-minute Flash test ([Forbes](https://www.forbes.com/sites/jamesmorris/2026/07/29/how-aviloo-is-solving-the-used-ev-market-battery-health-trust-problem/)).
- **Free warranty:** since September 2026, a qualifying Flash test in Luxembourg includes a warranty that pays **€3,000** if SoH falls below a vehicle-specific threshold within a year or 20,000 km ([electrive](https://www.electrive.com/2026/09/08/aviloo-expands-battery-warranty-to-26-countries/)).

Moba reaches Benelux garages through the TECH360 network ([AAG Benelux](https://www.allianceautomotivegroupbenelux.com/en/news/tech360-and-moba-join-forces-for-fast-and-reliable-ev-battery-diagnostics)) and counts Arval among about 100 customers ([AM Online](https://www.am-online.com/news/arnold-clark-adds-ev-battery-health-checks-with-moba-partnership)). Mahle made its CARA-approved E-Scan read-out **free** on its workshop tools in March 2026 ([Mahle](https://newsroom.mahle.com/press/en/press-releases/mahle-receives-cara-certification-for-battery-diagnostic-function-e-scan-112064)). Carmakers are claiming the number too: Stellantis's Spoticar used-car arm issues a certificate with every used EV it sells ([Spoticar UK](https://www.spoticar.co.uk/used-cars/erase-your-doubts-electric)), and three French sellers have made the listing pledge above.

The clearest warning is the Battery Quick Check joint venture between TÜV Rheinland, a major inspection company, and TWAICE, a well-funded analytics firm. It was **shut down in February 2025**, about 18 months after launch ([electrive.net](https://www.electrive.net/2025/02/03/tuev-rheinland-gibt-battery-quick-check-weiter/)). The survivors own a sales channel or bundle the test into tools they already sell. Having a good algorithm did not save anyone.

| Player | Method | Price (dated, partly unverified) | Presence near you |
|---|---|---|---|
| Aviloo (AT) | Flash: 3-minute OBD test using machine learning (ML) trained on drive-down tests. Premium: drive-down test over up to 7 days | €35/test + €480/yr for businesses; €99 for consumers | ACL since 2021; free warranty in Luxembourg |
| Moba (FR) | App plus dongle reading the BMS; CARA-approved | €79 kit; business price not public | TECH360 Benelux, GO Remarketing NL/BE, Arval |
| Generational (UK) | Dongle reading the BMS plus cell voltages; CARA-approved | From £28.50/test | UK-focused |
| DEKRA | 15-minute acceleration test validated by RWTH Aachen university, or a BMS read-out | Subscription plus per-report fee | DEKRA NL |
| Mahle | E-Scan BMS read-out; CARA-approved | Free on its tools | Independent workshops |
| Recurrent (US) | Scores from connected-car data; no test needed | $50–250/month per dealer at its 2020 launch | None in Europe |
| TWAICE, volytica, Accure | Cloud battery analytics for large companies | Enterprise contracts | Buses, energy storage, carmakers, some leasing |

Table sources: [Forbes](https://www.forbes.com/sites/jamesmorris/2026/07/29/how-aviloo-is-solving-the-used-ev-market-battery-health-trust-problem/); [Moba](https://get-moba.com/produit/kit-de-certification/); [AM Online](https://www.am-online.com/news/generational-adds-cell-level-ev-battery-testing-for-dealers); [DEKRA](https://www.dekra.com/en/battery-test-for-electric-cars/); [GeekWire](https://www.geekwire.com/2020/new-startup-recurrent-brings-transparency-ev-batteries-reducing-risk-used-car-shopping/); [volytica](https://www.volytica.com/solutions/e-mobility/).

The openings are exactly where the car's own reading is weakest. The only independent head-to-head test of these services was run by BOVAG, the Dutch car-trade association, and VER, the Dutch EV drivers' association. It rated Aviloo Flash and Moba most reliable because their results *matched the manufacturers' own tests*. It still advised that the manufacturer's test should be the leading document in warranty cases ([BOVAG](https://www.bovag.nl/pers/persberichten/onderzoek-betrouwbaarheid-batterijtesten-tweedehands-elektrische-autos)). CARA's standard reports SoH against the type-approved usable energy, as "generated or calculated" by the car's own BMS ([CARA](https://cara-europe.org/wp-content/uploads/2023/05/CARA-Europe-Battery-Health-Check-Regulations-28042023.pdf)). In other words, it standardises how the reading is taken, not whether the reading is true.

There is evidence that it often isn't:
- **Across brands:** a March 2026 preprint on **1,114 fleet EVs** compared BMS-reported SoH with capacity measured independently from constant-current charging. The match ranged "from complete non-availability to moderate correlation" ([arXiv 2603.21592](https://arxiv.org/pdf/2603.21592)).
- **Over time:** Aviloo reports a BMS reading that jumped from 80% to 100% after a software update ([Aviloo](https://aviloo.com/en-us/read-out-vs-testing)).
- **Within a model:** cars of the same model vary by up to **13.5 percentage points** in SoH ([APTI](https://www.automotivepowertraintechnologyinternational.com/news/battery-management/aviloo-launches-independent-study-into-used-ev-battery-health.html)).

The second opening is that Europe has no equivalent of Recurrent, the US company that scores batteries from connected-car data. European connected-car data services mostly expose the charge level, not battery health; Smartcar, for example, has no SoH endpoint ([Smartcar docs](https://smartcar.com/docs/api-reference/evs/get-battery-level)). Geotab's study of **22,700 fleet EVs** shows that fleet data can measure degradation. It found that heavy DC fast-charging above 100 kW roughly doubles yearly degradation, to 3.0% a year against about 1.5% for mostly AC charging ([Geotab](https://www.geotab.com/press-release/ev-battery-health-degradation-fast-charging-study/)). A fleet will pay for advice that saves both batteries and money.

The remaining openings are weaker:
- **Light electric vehicles:** battery passports for e-bikes and similar vehicles start in February 2027, but those batteries cost only €300–700 to replace ([Codibly](https://codibly.com/blog/articles/eu-battery-regulation-passport-bess-operators)), so there is little to charge for.
- **Electric vans:** whether the existing tests cover them was not verified.
- **Old, cheap EVs:** low-cost tests for older models such as the Renault Zoe and Nissan Leaf already compete with free apps.

**The wedge worth pursuing is to become the independent battery auditor for Greater Region fleets and lessors.** The product has three parts:
- **Continuous tracking:** SoH measured from data the fleet already produces, such as Tesla's cloud telemetry, cheap OBD loggers and depot chargers.
- **Pre-sale or re-lease reports:** measured usable energy set against the BMS figure, with a published error band.
- **Charging-policy advice.**

The timing fits. Lessors are starting "second-life" deals that lease the same EV out again ([Autocar](https://www.autocar.co.uk/car-news/company-cars/leasing-firms-pivot-%E2%80%98second-life%E2%80%99-deals-combat-ev-depreciation)), so they need to know which batteries justify a second contract. McKinsey values a 3% gain in the accuracy of leasing companies' resale-value forecasts at about €12 billion across Europe ([McKinsey](https://www.mckinsey.com/industries/automotive-and-assembly/our-insights/car-leasing-in-europe-managing-residual-value-for-a-12-billion-euro-opportunity)).

The case against deserves a fair hearing. Arval already buys from Moba and Aviloo. Ayvens accepts certificates based on BMS readings. Big lessors sign contracts at group level. Geotab or volytica could add this feature quickly; volytica already lists leasing companies and insurers as customers and plugs into Bridgestone's Webfleet platform. Your edge is local presence, a published method and speed, not secret technology. That points you towards Luxembourg subsidiaries, mid-size corporate fleets and dealer groups, not group headquarters.

Two options are worth dropping entirely:
- **Enterprise analytics for buses and energy storage:** TWAICE has raised about $105 million ([Tracxn](https://tracxn.com/d/companies/twaice/__Q1YZOxAc-FTx6Us_BU5hcCufvyiZBzp8QscgzbNraFo)) and Accure about $34.6 million ([FinSMEs](https://www.finsmes.com/2025/02/accure-battery-intelligence-raises-16m-in-series-b-funding.html)).
- **Reselling someone else's kit:** it puts you head to head with ACL on thin margins. Use it at most as a short-term way to make contacts.

## One engineer can reach ±3–5% on a few platforms, not Aviloo's breadth

Reading the car's own SoH takes a few weeks to build, but it is not a measurement. The open ABRP diagnostic-code repository (Apache-2.0 licence) already lists the codes that return SoH for Hyundai/Kia E-GMP cars, the Renault Zoe ZE50, Mini, Ford Mach-E, Jaguar I-Pace, MG ZS EV and Honda e:Ny1. It has no SoH field for VW's MEB platform or the GM Bolt ([iternio/ev-obd-pids](https://github.com/iternio/ev-obd-pids)), and Tesla exposes energy in kWh rather than a percentage ([model3dbc](https://github.com/joshwardell/model3dbc)).

These values are defined by each carmaker, often exclude the reserve buffer, and cannot be compared across brands:
- **Hidden buffer:** on E-GMP cars, owners report that SoH stays at 100% until energy at full charge falls from about 74 kWh to below roughly 70 kWh ([IoniqForum](https://www.ioniqforum.com/threads/understanding-soh-and-degradation.53005/)).
- **Tool disagreement:** Kia owners say consumer dongles can "differ significantly" from the dealer tool ([Kia Niro Forum](https://www.kianiroforum.com/threads/how-to-determine-your-battery-state-of-health-no-its-not-thru-the-obd2-port.13593/)).

Use the BMS value as an input and a cross-check, never as the product.

The independent method you can build is capacity counting over a charge or a drive. You divide the energy or charge that flows (ΔAh or ΔkWh) by the change in state of charge (ΔSoC) over long segments, and normalise for temperature. Recent field studies report **under 2% error against offline reference tests** when segments are chosen carefully ([Batteries 2026](https://doi.org/10.3390/batteries12010010)). The limit on precision is the error in the start and end SoC readings, not the current measurement. With a 1-point error at each end, the relative capacity error is about √2 ÷ ΔSoC (with ΔSoC in points):

| SoC window | Capacity error |
|---|---|
| 20 points | about 7% |
| 50 points | about 2.8% |
| 80 points | about 1.8% |

So use wide windows, read the endpoints after the pack has rested, and average over many sessions.

Other methods help in narrower cases:
- **Incremental capacity analysis (dQ/dV)** has reached about 2% error on real EVs ([J. Energy Storage 2023](https://www.sciencedirect.com/science/article/pii/S2352152X23005078)). It is fragile on coarse cloud data but earns its place on LFP packs, whose flat voltage curve defeats SoC-based counting.
- **ML models trained in the lab** reach 1–2% on single cells, but reviews warn that "SoH algorithms not based on realistic driving data are likely to be inaccurate in the field" ([Batteries 2026 review](https://doi.org/10.3390/batteries12050174)). Microsoft's BatteryML toolkit was archived on 15 September 2026 ([BatteryML](https://github.com/microsoft/BatteryML)).
- **Impedance spectroscopy on a whole pack** needs high-voltage equipment that no solo founder should build.

Your vehicle-dynamics background is a real edge in drive-down tests, where you must separate consumption effects (speed, heating and cooling load, temperature) from capacity. MATLAB is good for prototyping a Kalman-filter capacity estimator, but ship the product in Python using python-can, udsoncan and PyBaMM.

| Method | Time per car | Realistic accuracy for you | Needs |
|---|---|---|---|
| BMS read-out only | Minutes | Depends on brand; not a measurement | Table of diagnostic codes, €30–140 dongle |
| One wide-window charge (≥50 points) | One session | About ±3–5% | Pack voltage, current and SoC at ≥1 Hz |
| Counting over many sessions, with rested endpoints | Days to weeks of logging | About ±2–3% | Logger or telematics feed |
| Full controlled drive-down or charge | 1–7 days | About ±1–2% against a reference, in mild weather | Logger, controlled conditions |

These tiers are an engineering synthesis from the studies above, not published benchmarks. Aviloo claims its Flash test is about **±3% against its own drive-down test** ([Aviloo](https://aviloo.com/en/blog/the-new-aviloo-flash-test-more-clarity-more-trust-more-success)), but it trained the test on "tens of thousands" of those drive-downs. That dataset is Aviloo's real moat, and the reason you should not build a three-minute test first. The regulatory tolerance for on-board monitors is about **5 points**.

Validation makes the product credible. For each platform:
1. Recruit at least 20–30 cars across a range of mileages.
2. Run a reference test on each car: charge to 100% and hold there while the cells balance, rest the car for at least two hours, then drive it down to 10% or less while logging continuously. Integrate the energy on the battery (DC) side. Tesla's in-car battery-health test uses the same principle over 24 hours or more ([Not a Tesla App](https://www.notateslaapp.com/news/2049/teslas-battery-health-test-see-your-battery-health-in-app-or-in-service-mode)).
3. Re-test a subset of cars to measure repeatability.
4. Report bias, RMSE and 95th-percentile error against the reference test, alongside the BMS and dealer-tool values.

That lets you honestly claim ±5% in 95% of cases. Claiming ±3% needs a few hundred reference tests per platform family, and ±2% is only honest for certificates based on a full cycle. No open fleet dataset includes reference capacity tests per vehicle, and the Chinese fleet datasets have no clear licence ([EVBattery](https://github.com/iMohammad97/evbattery-dataset)). The labelled dataset you build yourself is therefore both your biggest cost and your only lasting asset.

Your legal right to the data is stronger than most founders assume, but carmakers still control the practical routes:
- **Battery Regulation:** its definition of "independent operator" expressly includes "operators offering inspection and testing services" ([Battery Pass Content Guidance](https://github.com/batterypass/BatteryPassDataModel/blob/main/docs/1.2/2023_Battery_Passport_Content_Guidance.pdf)). The Article 14 access right belongs to whoever bought the battery. For a leased car that is the lessor, not the driver, so contract with the lessor. This is my inference; the Regulation's wording on lessees was not verified.
- **Battery passport access:** the act that defines who has a "legitimate interest" in passport data missed its 18 August 2026 deadline and is now expected in Q4 2026 ([Battery-Tech Network](https://battery-tech.net/why-the-eu-is-about-to-miss-its-own-battery-passport-deadline-while-industrys-stays-fixed/)).
- **EU Data Act:** since September 2025 a vehicle's user can direct its raw and lightly processed data to you. The Commission's guidance, however, excludes "inferred or derived" data ([Bird & Bird](https://www.twobirds.com/en/insights/2025/navigating-the-data-act-eu-commission-guidance-for-the-automotive-sector)), so carmakers can withhold their own SoH figure. That is another reason to compute SoH yourself from raw voltage, current and SoC.
- **Tesla's cloud data (Fleet Telemetry):** this is the richest feed. It includes pack voltage and current, nominal full-pack energy and the lowest and highest cell-group ("brick") voltages ([Tesla fleet-telemetry](https://github.com/teslamotors/fleet-telemetry/blob/main/protos/vehicle_data.proto)). Teslemetry, a third-party data service, estimates streaming costs at about $0.00667 per car-hour, against about $0.12 per hour for polling ([Teslemetry](https://teslemetry.com/blog/tesla-fleet-api-pay-per-use)).
- **Other data aggregators:** High Mobility's data schema includes a `state_of_health` field, but which carmakers actually fill it is unconfirmed ([High Mobility auto-api](https://github.com/highmobility/auto-api)).
- **Diagnostic-port access:** the EU Court of Justice ruled in 2023, in *Carglass/ATU v FCA Italy* (C-296/22), that carmakers cannot impose access conditions beyond those in the EU type-approval law ([Morgan Lewis](https://www.morganlewis.com/pubs/2023/12/european-court-of-justice-facilitates-access-to-vehicle-data-for-independent-vehicle-repairers)). Delegated Regulation 2026/699 now sets out which security gateways are lawful ([Noerr](https://www.noerr.com/en/insights/delegated-regulation-sets-out-new-guidelines-for-secure-gateways-obd-access-and-rmi)).
- **Stellantis gateways:** Stellantis cars still require authenticated tools, and the AutoAuth login service reportedly stopped working for EU users in September 2025 ([DiagStore.ie](https://www.diagstore.ie/blog/unlocking-the-sgw-on-fca-vehicles/)). Stick to read-only requests and never use gateway-bypass cables.
- **Data protection (GDPR):** a vehicle identification number (VIN) is personal data once you can link it to an owner ([European Law Blog on C-319/22](https://www.europeanlawblog.eu/pub/88nomk75)). As a data controller you need a contract or consent, and you should not collect GPS location.
- **Standards and liability:** there is no harmonised standard for used-EV certificates, and SAE J3257 is still in progress ([SAE](https://www.sae.org/standards/content/j3257/)). Report your headline figure as SOCE under GTR 22, carry professional indemnity insurance, and print the error band on every report.

## An 18-month home build with a kill switch at month 12

Comparable companies took a while to launch:
- **Generational:** about **15 months from founding to public launch** ([AM Online](https://www.am-online.com/news/start-up-generational-unveils-ev-battery-health-technology-for-used-car-market)). It had two founders, one of whom led vehicle modelling and data science at Red Bull Racing's F1 team ([ElectricDrives.tv](https://electricdrives.tv/ev-leaders-oliver-phillpott-co-founder-generational/)). That is the closest match to your profile.
- **Aviloo:** two years of R&D, starting in a garage ([Trending Topics](https://www.trendingtopics.eu/aviloo-startup-sammelt-durch-crowdfunding-125-millionen-euro-ein/)).
- **Recurrent:** launched with three dealers paying $50–250 a month. It moved faster by buying access to car data from Smartcar, which its CEO said saved "6 to 12 months and millions of dollars" ([GeekWire](https://www.geekwire.com/2020/new-startup-recurrent-brings-transparency-ev-batteries-reducing-risk-used-car-shopping/); [Smartcar](https://smartcar.com/blog/case-study-recurrent)).

The plan below keeps your salary until a customer pays:

| Phase | Months | What you do | Go/no-go |
|---|---|---|---|
| 1. Customer discovery | 0–2 | Hold 15–20 conversations with fleet managers at large Luxembourg employers, the remarketing and re-lease desks of Ayvens LU, Arval LU and Leasys LU, dealer used-car centres such as Autopolis, and the listing sites Luxauto and AutoScout24.lu. Ask what they use now, what they pay, where battery disputes arise at end of lease, and whether they would share charging data | Two organisations agree to a free pilot with data access |
| 2. Measurement engine | 1–4 | Build for Tesla (Fleet Telemetry), Hyundai/Kia (open diagnostic codes) and one model common in the pilot fleets. Write the partial-charge estimator with temperature normalisation, using the BMS reading only as a cross-check | Repeatable results on your own and friends' cars |
| 3. Reference dataset | 3–9 | Run 20–30 reference drive-downs per platform. Recruit cars by offering free tests to EV owners in exchange for data. Publish a validation note, ideally co-authored with LIST (Luxembourg's public research institute) or the University of Luxembourg | Error of 5% or less in 95% of cases against the reference |
| 4. Paid pilot | 6–12 | Give one fleet or lessor a fleet SoH dashboard plus pre-sale verification reports | **At least one paying customer by month 12, or stop** |
| 5. Company and scale | 9–18 | Set up the company and business permit, and buy indemnity insurance. Apply to the Bissen Automobility Incubator and the Fit 4 Start accelerator. Talk to CARA or TÜV/DEKRA only if you need remarketing channels. Expand across the Greater Region | Sales beyond the first customer |

Before you have cars, build and test your data pipeline on open data. The Stanford real-driving-profile cell dataset includes periodic capacity checks ([Data in Brief](https://www.sciencedirect.com/science/article/pii/S2352340922002062)), and the BMW i3 real-driving dataset is logged at 10 Hz ([IEEE DataPort](https://ieee-dataport.org/open-access/battery-and-heating-data-real-driving-cycles)). Neither gives vehicle-level ground truth, so they cannot replace your own validation. Insurers such as Foyer, and banks that finance EVs, are later targets; no evidence was found that they buy SoH reports today.

Expect to spend about €5–12k in cash before revenue, plus living costs:

| Item | Cost | Basis |
|---|---|---|
| 2–3 OBDLink MX+ adapters plus brand-specific cables | $139.95 each; €300–600 total | [OBDLink](https://www.obdlink.com/products/obdlink-mxp/); cable costs assumed |
| WiCAN always-on loggers | $42 standard / $89 PRO (GPL firmware) | [WiCAN](https://github.com/meatpiHQ/wican-fw) |
| CSS CANedge3 CAN/OBD/UDS logger with 4G | €580 | [CSS Electronics](https://www.csselectronics.com/products/can-bus-data-logger-4g-lte-canedge3-gnss) |
| Access to cars for reference tests | €500–3,000 | Assumption |
| SARL-S formation (simplified limited company), business permit, LuxTrust digital ID | €430–1,500 | [Odysya](https://odysya.io/guides/sarl-s-cost-luxembourg); [Bookkeeper.lu](https://bookkeeper.lu/en/blog/company-formation-cost-luxembourg) |
| Accountant | €1,500–3,000/yr | Assumption |
| Self-employed social security, only if this becomes your main activity | About €225–240/month minimum | [Bookkeeper.lu](https://bookkeeper.lu/en/blog/cotisations-sociales-independant-luxembourg) |
| Professional indemnity and liability insurance | Get quotes | Unknown |

Avoid cheap "v2.1" ELM327 clone adapters.

**Pricing.** Anchor to the market, but sell a different unit:

| Product | Market price | Basis |
|---|---|---|
| Basic read-out test for businesses | €25–40 per car | Aviloo €35; Generational £28.50 |
| Consumer test | €79–99 | Moba kit; Aviloo Premium |
| Dealer subscription | $250/month at Recurrent's 2020 top tier | Reaching €60,000 a year at that price takes more than 20 customers |

Price your verification report above the €99 consumer test, and charge fleet tracking per vehicle per month. Neither has a public benchmark, so test both prices in your discovery conversations.

**Credibility.** Build it in this order:
1. Publish the validation study on 30 or more vehicles.
2. Add a research co-author. LIST's battery work is materials-level ([LIST](https://www.list.lu/en/news/towards-safer-and-more-sustainable-lithium-ion-batteries/?no_cache=1&cHash=864ca294e9ede349653316f96dd6c92f)), so its value to you is its name.
3. Approach a testing body. DEKRA leans on validation by RWTH Aachen ([DEKRA](https://www.dekra.com/en/battery-test-for-electric-cars/)), and CARA approval is in effect the entry ticket to European remarketing channels.

**Company and funding.** A SARL-S needs €1 of capital and no notary ([Fiduciaire-Expert](https://fiduciaire-expert.lu/en/articles/sarl-s-luxembourg-simplified-limited-liability-company/)). The business permit costs €50 and is decided within three months ([Fiduciaire-Expert](https://fiduciaire-expert.lu/fr/articles/autorisation-etablissement/)). Check first whether battery diagnostics counts as a regulated trade that requires a professional qualification. Fit 4 Start pays up to **€150,000 without taking equity** ([Luxinnovation](https://luxinnovation.lu/assess-and-accelerate/fit4start)). Its 17th edition accepted only Digital, Health tech, Defence and Space startups ([Silicon Luxembourg](https://www.siliconluxembourg.lu/fit4start-17-call-for-applications/)), so you would apply as battery-analytics software; the next call date is not confirmed. The Automobility Incubator in Bissen opened in December 2024 with 400 m² of R&D labs and automotive neighbours ([Silicon Luxembourg](https://www.siliconluxembourg.lu/luxembourg-inaugurates-automobility-incubator-in-bissen/)). It is the natural base once you incorporate.

**Risks.** The main ways this fails:
- Lessors are locked into group contracts.
- Carmaker firmware updates and security gateways break your vehicle coverage faster than one person can repair it.
- A wrong SoH figure triggers a price dispute.
- The market is too small.
- You burn out doing field testing and software alone.

The month-12 kill switch exists because none of these risks shows up on a spreadsheet; they show up as prospects who never sign. If the validation works but nobody pays, the dataset and method can still be licensed or sold to an incumbent. Be aware, though, that no acquisition of an SoH startup was found in 2023–2026.

## Twelve figures and rules to verify before you commit

The research tools could not open most web pages, so these items rest on search-result summaries, single sources or conflicting sources. Each one can change a decision.

| Item | Why it matters | Status |
|---|---|---|
| Aviloo business pricing: €480/yr + €35/test | Sets your price ceiling | Forbes search snippet only |
| Aviloo's free €3,000 warranty covers Luxembourg | Sets the competitive bar | Sources say 24 or 26 countries |
| Generational from £28.50/test, £95 kit, £100 setup | Price floor | Unclear which source gave which figure |
| BCA +£258 (1.4%), 2.7 days faster | Core evidence that buyers pay more | Vendor-operated data |
| Luxembourg: 12,664 new BEVs, 26.9% share; 47% of EVs leased | Sets the local ceiling | Outlet attribution unconfirmed; leasing share undated and poorly sourced |
| Euro 7: 80%/72% durability minimums; 29 Nov 2026/2027 monitor dates | When free on-board SoH arrives | Secondary sources; others cite 70%; the Dec 2025 automotive omnibus may amend it |
| Battery Regulation Art. 14(2) wording on lessees; timing of the Art. 77(9) access act | Your legal access to data | Article text not read; delay reported in titles and snippets only |
| arXiv 2603.21592 finding that BMS readings fail validation | Core of the verification pitch | Abstract-level summary; preprint, not peer-reviewed |
| Tesla Fleet Telemetry at ~$0.00667 per car-hour | Data cost per vehicle | Teslemetry's estimate; Tesla's own documentation could not be opened |
| AutoAuth unusable in the EU since Sept 2025 | Access to Stellantis cars | Single search summary |
| Permit category for battery diagnostics | Could require a trade qualification | Unconfirmed; ask Guichet.lu or the House of Entrepreneurship |
| Date and eligibility of Fit 4 Start's 18th edition | Your main funding that does not cost equity | The 17th edition excluded mobility; timing of the 18th is a guess |

## Conclusion

The market has already answered the question most people ask, which is whether anyone can sell a battery percentage. Incumbents now sell it for €35, attach a warranty to it, or give it away, and regulation will make the bare number free for new cars from 2027. The more useful point is that the same rules create demand for checking the number. Once every car displays an official figure that may be 5 points off, that each brand defines differently, and that can jump after a software update, a lessor facing a €20,000 decision to sell or re-lease needs someone to say whether the figure is true. That job suits a physics-minded CAN engineer better than a reseller of dongles. It rewards measured data over distribution muscle, and that is the only contest a solo founder can realistically win.

Treat it as a disciplined experiment, not a leap. What you are really building is a labelled reference dataset of measured battery capacity on the models Greater Region fleets actually drive. If one fleet pays for what that dataset produces within a year, you have a small, profitable specialist business. It also extends battery life through better charging policy, which serves both of your goals. If no one pays, you will have found out for a few thousand euros while still employed, and you can sell the method and data to someone who already owns the sales channel.
