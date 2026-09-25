# Technical Methods for EV Battery State-of-Health (SoH) Estimation, and Whether a Solo Engineer Can Build an Accurate SoH Product

Research notes, compiled 25 Sept 2026. Research conditions: this session's egress proxy blocked full-text fetches from most publisher, vendor and regulator domains (nature.com, mdpi.com, arxiv.org, pmc.ncbi.nlm.nih.gov, aviloo.com, twaice.com, volytica.com, smartcar.com, developer.tesla.com). The web-search budget also ran out partway through. Most claims below therefore rest on search-engine summaries of those pages, plus files read directly from GitHub repositories (clone or fetch), which were accessible. Findings that come only from a search summary are marked "(search summary)" where the exact wording matters. The report writer should treat vendor accuracy numbers as vendor claims.

---

## 1a. BMS-reported SoH via OBD-II / UDS PIDs: which brands expose it, how reliable is it, and what about OEM buffer or manipulation concerns?

### Takeaway
Several brands put a BMS SoH value on a manufacturer-specific UDS (service 0x22) DID that a cheap ELM327-class dongle can read. Examples are Hyundai/Kia, Mini, Renault Zoe, Ford Mach-E, Jaguar I-Pace, MG ZS EV, Aiways U5, Honda e:Ny1 and Nissan Leaf. But the value is OEM-defined, not standardised, and often excludes the buffer. It can stay at 100% for tens of thousands of km and can jump after software updates. A read-out alone is fast and cheap, but it is not an independent measurement and cannot support a credible "certificate" by itself.

### Cited Findings
- **Concrete SoH DIDs in the open ABRP PID repository** (Apache-2.0), read directly from the JSON files:
  - Hyundai Ioniq 5 / E-GMP: ECU `7E4`, command `220105`, SoH = `((aa<<8)+ab)/10`.
  - Mini Cooper SE: ECU `607`, `226335`.
  - Renault Zoe ZE50: ECU `DADBF1`, `229003`, `0.01*(A*256+B)`.
  - Ford Mach-E: `22490C` on `7E4`, `A*0.5`.
  - Jaguar I-Pace 2019/2021: `224918` on `7E4`, `A/2`.
  - MG ZS EV: ECU `781`, `22B061`, `(A*256+B)/100`.
  - Aiways U5: `221012`.
  - Honda e:Ny1: `22202A`, `(II*100)/255`.
  - The VW (MEB, e-Golf, e-Up) and GM Bolt files in the same repo define **no** SoH field.
  - Source: [iternio/ev-obd-pids](https://github.com/iternio/ev-obd-pids).
- The same repository covers Mini, Aiways, Deepal, Ford, GMC, HKMC, Honda, Jaguar, MG, Renault and Volkswagen, and supports Torque-style equations — [iternio/ev-obd-pids](https://github.com/iternio/ev-obd-pids)
- A community repository of Torque Pro PID configurations exists for Hyundai/Kia EVs (Soul EV 27/30/64 kWh, Ioniq EV/HEV/PHEV, Kona/Niro EV, Ray EV). It has no explicit license and an "only intended for scientific usage" disclaimer — [JejuSoul/OBD-PIDs-for-HKMC-EVs](https://github.com/JejuSoul/OBD-PIDs-for-HKMC-EVs)
- Nissan Leaf exposes SoH (percentage of remaining capacity vs new) on a dedicated PID; tools such as LeafSpy read it. Leaf, Bolt and Ioniq are cited as SoH-capable — [OBDLLM blog](https://obdllm.com/en/blog/ev-hybrid-obd-diagnostics-tesla-nissan-leaf/); [Autodoc guide](https://www.autodoc.co.uk/info/best-apps-and-obd2-tools-to-check-ev-battery-health-complete-uk-guide) (search summary; lower-quality consumer blogs)
- Consumer guides say OBDeleven shows ID.3/ID.4 owners a battery SoH percentage that VW does not display on the dashboard — [Skanyx guide](https://skanyx.com/blog/ev-diagnostic-tools-guide) / [Autodoc guide](https://www.autodoc.co.uk/info/best-apps-and-obd2-tools-to-check-ev-battery-health-complete-uk-guide) (search summary; the exact source page among these two was not confirmed)
- Kia/Hyundai owner reports:
  - The SoH shown by a consumer OBD2 dongle and app "will sometimes differ significantly" from what a dealer's KDS/GDS tool shows.
  - Most users see OBD SoH stay at 100% "well into 30, 40, even 100,000 km and more."
  - Source: [Kia Niro Forum](https://www.kianiroforum.com/threads/how-to-determine-your-battery-state-of-health-no-its-not-thru-the-obd2-port.13593/) (owner forum, anecdotal); also [TorqueNews, Ioniq 6 at 100% SoH after 22,000 miles](https://www.torquenews.com/18000/obd2-scanner-shows-100-soh-after-22000-miles-i-cannot-find-any-technical-details-how-soh)
- E-GMP owner analysis:
  - The BMS SoH appears to exclude the buffer, so it reads 100% for longer than on other brands.
  - "Remaining energy" at 100% displayed SoC reads just under 74 kWh on new cars.
  - The SoH PID starts to drop only once that figure falls below about 70 kWh, behaving roughly like a trailing average of (energy at 100% SoC)/70 kWh.
  - Source: [IoniqForum – understanding SoH](https://www.ioniqforum.com/threads/understanding-soh-and-degradation.53005/); [IoniqForum – buffers](https://www.ioniqforum.com/threads/battery-usable-capacity-and-safety-margins-buffers.31286/) (forum reverse-engineering, not OEM-confirmed)
- A 2026 arXiv study proposes a BMS-independent capacity-measurement protocol based on constant-current charging segments. It reports that OBD SoH reliability is "profoundly model-dependent", ranging "from complete non-availability to moderate correlation under controlled conditions" — [arXiv 2603.21592](https://arxiv.org/pdf/2603.21592) (search summary only; the full text could not be fetched)
- Aviloo (vendor) claims:
  - SoH of 90% from manufacturer A may not mean the same as 90% from manufacturer B, because each OEM uses its own algorithms and thresholds.
  - Across thousands of vehicles, it has seen deviations "from a few percent" up to a case where a BMS reported 80% one day and 100% after a software update, with no physical change.
  - Source: [Aviloo – Read-out vs Testing](https://aviloo.com/en-us/read-out-vs-testing); [Aviloo SoH fact-check PDF](https://aviloo.com/files/Aviloo/content/pdf/PM_Faktencheck_SOH_engl.pdf) (vendor with a commercial interest in discrediting read-outs)
- Tesla does not expose an SoH percentage over OBD in the sources found. Its internal CAN (DBC, MIT license) carries:
  - `BMS_nominalFullPackEnergy`, `BMS_nominalEnergyRemaining`, `BMS_idealEnergyRemaining`, `BMS_expectedEnergyRemaining`, `BMS_energyBuffer`, `BMS_energyToChargeComplete`.
  - These were grepped from `Model3CAN.dbc` in [joshwardell/model3dbc](https://github.com/joshwardell/model3dbc).
  - Owners are advised to track nominal full-pack kWh as a trend over months rather than trust a single reading ([TMC thread](https://teslamotorsclub.com/tmc/threads/degradation-estimate-with-obd-data.346141/), search summary).

### Inferences
- A read-out product can be built in weeks: a DID table plus ELM327/STN or CAN access. The PID knowledge is largely public for HKMC, Renault, Stellantis-adjacent MG, JLR, Ford and Mini. But the number it reports is the OEM's number. For E-GMP cars it is buffer-masked, and it is not comparable across brands. Selling it as an "independent SoH" would be misleading.
- The BMS SoH is still useful as one input feature, and as a sanity check against an independent measurement. Aviloo itself runs "SoC/SoH plausibility checks" against the BMS (see 1e).
- Coverage is uneven. VW MEB and GM Bolt have no SoH in the ABRP repo, and Tesla exposes energy (kWh) rather than %. A product must fall back to energy-based calculation (for example nominal full-pack kWh ÷ original kWh) for some brands.

### Gaps
- No authoritative, brand-by-brand list of which OEMs expose SoH via OBD was found. The ABRP repo, forums and consumer blogs are the best available evidence.
- No peer-reviewed quantification of the BMS-SoH vs measured-capacity error per brand was retrievable. arXiv 2603.21592 appears to contain this, but only its abstract-level summary was accessible.
- No sources found for BMW, Mercedes, Stellantis e-CMP, BYD or Polestar SoH DIDs. Car Scanner, ScanMyTesla and LeafSpy PID lists are proprietary or closed and were not examined.

---

## 1b. Cloud telematics APIs (Smartcar, High Mobility, Enode, Tesla Fleet API): which battery fields are available, and what do they cost?

### Takeaway
OEM-cloud aggregators mainly deliver SoC, range, charging state and a battery-capacity figure. Smartcar exposes `battery/capacity` and `battery/nominal_capacity`. High Mobility's schema defines `state_of_health`, `battery_capacity` and `battery_max_available`, but whether a given OEM populates them is unconfirmed. Tesla's Fleet Telemetry is by far the richest: pack voltage/current, nominal full-pack energy, energy remaining, and brick min/max voltages. Teslemetry estimates that streaming it costs about 18x less than REST polling for comparable data.

### Cited Findings
- **Smartcar:**
  - Its EV battery capacity endpoint returns battery capacity in kWh and is "widely available in the United States" ([Smartcar blog](https://smartcar.com/blog/ev-battery-capacity-api-production), search summary).
  - Its Python SDK (last commit 11 Aug 2026) has three methods: `battery()` (percent remaining, range), `battery_capacity()` → `GET battery/capacity`, and `nominal_capacity()` → `GET battery/nominal_capacity`. The last returns `availableCapacities` / `capacity`, which is a spec-sheet style selection, not measured degraded capacity.
  - No SoH endpoint appears in the SDK. Source: [smartcar/python-sdk vehicle.py](https://github.com/smartcar/python-sdk)
- **High Mobility:**
  - Its open Auto API schema (`capabilities/charging.yml`) defines `battery_capacity` (kWh), `battery_max_available` ("maximum available energy content of the high-voltage battery", kWh) and `state_of_health` ("can be greater than 1.0 due to production variance") — [highmobility/auto-api](https://github.com/highmobility/auto-api)
  - High Mobility claims partnerships with 22+ OEMs, 500+ models and 300+ data items. Brands include BMW, MINI, Mercedes-Benz and Ford — [High Mobility](https://www.high-mobility.com/); [BMW Data API](https://www.high-mobility.com/car-api/bmw-data-api)
- **Enode** exposes battery level, charge rate, charge time remaining, plug-in state and battery capacity (kWh) — [Enode EV API](https://enode.com/use-cases/electric-vehicles); [Enode EV API guide](https://enode.com/blog/guide/electric-vehicle-api)
- **Tesla Fleet Telemetry** battery-related fields, from the official protobuf:
  - `PackVoltage`, `PackCurrent`, `NominalFullPackEnergyKwh`, `EnergyRemaining`, `Soc`, `BatteryLevel`, `BMSState`, `BmsFullchargecomplete`.
  - `BrickVoltageMax/Min` with `NumBrickVoltageMax/Min`, `BrickSocMinPercent`, `ModuleTempMax/Min`.
  - `RatedRange`, `IdealBatteryRange`, `EstBatteryRange`.
  - `DCChargingEnergyIn`, `ACChargingEnergyIn`, `ChargerVoltage`.
  - `LifetimeEnergyUsed`, `LifetimeEnergyUsedDrive`, `LifetimeEnergyGainedRegen`, `LifetimeEnergyChargedKwh`.
  - Source: [teslamotors/fleet-telemetry vehicle_data.proto](https://github.com/teslamotors/fleet-telemetry/blob/main/protos/vehicle_data.proto)
- **Tesla Fleet API pricing:**
  - Usage charges started 1 Feb 2025.
  - REST `vehicle_data` polling at about 1-minute intervals costs about $0.12 per hour of driving or charging, roughly $10/month per vehicle.
  - Fleet Telemetry costs about $0.00667 per hour per car for similar data (about 18x cheaper).
  - Sources: [Teslemetry blog](https://teslemetry.com/blog/tesla-fleet-api-pay-per-use); [Not a Tesla App](https://www.notateslaapp.com/news/2415/tesla-announces-api-pricing-third-party-service-costs-expected-to-rise); [Tesla billing docs](https://developer.tesla.com/docs/fleet-api/billing-and-limits) (search summary)
- **Recurrent** (the US leader in telematics-based battery reports) uses onboard telematics, with driver permission, to check each battery several times per day across a fleet of about 30,000 active EVs. Its Range Score compares a vehicle's current range with the range expected when new for that make, model and configuration: 97 means 97% of original range — [Recurrent dealer FAQ](https://www.recurrentauto.com/dealers/faq); [Charged EVs](https://chargedevs.com/newswire/recurrent-reports-offer-battery-and-range-info-for-65000-used-evs/)

### Inferences
- For a solo engineer, Tesla Fleet Telemetry is the best cloud-only route. `NominalFullPackEnergy` is a BMS capacity estimate, and pack V/I plus brick voltages allow independent partial-charge energy counting (1c) and even coarse ICA (1d). Streaming cost should be modelled. Teslemetry's comparison puts it at about $0.00667 per car-hour versus about $0.12 per car-hour for REST polling. The exact Tesla billing units (per signal vs per car-hour) were not verified because Tesla's docs were blocked.
- Non-Tesla aggregators mostly give SoC% + range + nominal capacity. From these alone, SoH can only be inferred statistically, Recurrent-style: range at 100% vs a fleet baseline, adjusted for temperature. That needs a large fleet baseline, which a solo founder will not have at launch.
- Where an OEM populates High Mobility's `state_of_health`, it is still the OEM BMS value, with the same caveats as 1a.

### Gaps
- Smartcar, Enode and High Mobility pricing could not be retrieved (web-search budget exhausted, vendor sites blocked). Which OEMs actually populate High Mobility `state_of_health`, or Smartcar `battery/capacity` with a degraded value, is unverified.
- No published accuracy for Recurrent's Range Score vs measured capacity was found.

---

## 1c. Partial-charge coulomb counting / energy counting between two SoC points

### Takeaway
Estimating capacity as ΔAh (or ΔkWh) ÷ ΔSoC over a charging segment is the workhorse of field SoH. Recent field studies report under 2% error against offline reference tests when segments are carefully selected and "virtual full-charge" reconstruction is used. Accuracy is dominated by SoC-endpoint error, window width, temperature and the display-vs-BMS SoC mapping, not by the current integration itself.

### Cited Findings
- A "virtual full-charge segment" reconstruction method on a large real-world vehicle dataset achieves under 2% error vs offline validation tests. The average error band is under 1% and the maximum outlier is within 4%. A field validation kept relative error below 2%, with the maximum (1.9%) at the highest mileage — [Batteries 2026, 12(1):10](https://doi.org/10.3390/batteries12010010) (search summary)
- An interval-capacity data-driven method for real-world EVs reports 0.28% MAPE and 0.55% RMSPE for capacity estimation — [Energy 2022 (ScienceDirect)](https://www.sciencedirect.com/science/article/abs/pii/S0360544222016747) (search summary; the ground truth is itself derived from field data)
- Domain-knowledge-guided ML using power-autocorrelation and energy features estimates capacity within 1.5–2.5% maximum absolute percentage error — [Communications Engineering 2024](https://www.nature.com/articles/s44172-024-00304-2) (search summary)
- "Real-world data collection and pre-processing are labor intensive, and critically linked to the precision of EV capacity estimation" — [Batteries 2026, 12(1):10](https://doi.org/10.3390/batteries12010010) (search summary)
- OCPP-based variant: an IEEE conference paper estimates SoH from charger-measured electrical variables sent via OCPP. It uses coulomb counting "in combination with an investigation into losses within the vehicle's charging system" — [IEEE Xplore 10372240](https://ieeexplore.ieee.org/document/10372240/)
- Tesla's own in-car Battery Health Test is essentially a controlled full energy count:
  - It discharges (by stator heating plus A/C) to below 10%, then recharges to 100% on Level-2 AC while metering energy in, and compares the result with nominal capacity.
  - It can take 24 h or more and cannot run on 120 V or on a Supercharger.
  - Sources: [Not a Tesla App](https://www.notateslaapp.com/news/2049/teslas-battery-health-test-see-your-battery-health-in-app-or-in-service-mode); [JOWUA guide](https://www.jowua-life.com/blogs/tesla-owners-faq/tesla-battery-health-test-guide-everything-you-need-to-know)

### Inferences
- **Error propagation** (engineering inference): capacity Q = ΔAh/ΔSoC. With independent endpoint SoC errors σ each, the relative error is ≈ √2·σ/ΔSoC:
  - For σ = 1 pp: ΔSoC 20 pp → ~7%; 50 pp → ~2.8%; 80 pp → ~1.8%.
  - Using OCV-based SoC after a long rest (instead of the BMS's running SoC), wide windows (≥50 pp) and averaging many sessions is what makes ≤2% achievable.
  - Current-sensor bias adds a separate, systematic term.
- Use the BMS/"real" SoC, not the display SoC. Display SoC maps onto a buffered net window (see 1a, E-GMP), so ΔSoC(display) ≠ ΔSoC(cell).
- Energy counting (kWh) mixes capacity fade with resistance growth and temperature. Charger-side AC kWh includes on-board-charger losses, which is why the OCPP paper models losses. DC-side kWh is cleaner.
- This is the most practical independent method for a solo engineer. It needs only pack V, I and SoC at ≥1 Hz and some charging sessions.

### Gaps
- No commercial vendor's partial-charge method accuracy was found as a public number (except Aviloo's Flash ±3%, which is ML-based; see 1e).
- The accuracy of the OCPP-only approach (IEEE 10372240) is not known from the summary.

---

## 1d. Incremental capacity analysis (ICA, dQ/dV) and differential voltage analysis (DVA) from charging curves

### Takeaway
ICA/DVA works well in the lab and has been demonstrated on real EVs at about 2% RMSE. It is fragile on vehicles: BMS voltage/current quantisation, cloud down-sampling, dynamic currents, temperature and chemistry differences (LFP vs NMC) all degrade the peaks. It is best used as a feature generator feeding a regression model, on slow AC charging segments, with brick-level voltage.

### Cited Findings
- ICA applied to real EVs: two vehicles with different mileage gave "an overall RMSE of 2%" in SoH estimation — [J. Energy Storage 2023, "EV battery SoH estimation using ICA"](https://www.sciencedirect.com/science/article/pii/S2352152X23005078); see also [ResearchGate: ICA applied on EVs](https://www.researchgate.net/publication/349610883_Incremental_Capacity_Analysis_Applied_on_Electric_Vehicles_for_Battery_State-of-Health_Estimation) (search summary)
- "The suboptimal quality of cloud-based BMS data combined with the material heterogeneity of battery cathodes creates substantial barriers to developing universal SOH estimation methods for real-world EV applications." That paper uses IC curves plus the S-transform on pack data — [Applied Energy 2025](https://www.sciencedirect.com/science/article/abs/pii/S0306261925010645) (search summary)
- Dynamic real-world current profiles add substantial noise to ICA curves, and the noisier discharge data are usually excluded. One study found that 11 points collected from any starting SoC over at least 2.5 min are enough for reliable ICA curves (mean RMSE 0.2774 Ah/V) — [ICA under dynamic load, PMC12056397](https://pmc.ncbi.nlm.nih.gov/articles/PMC12056397/); [arXiv 2502.19586](https://arxiv.org/pdf/2502.19586) (search summary; the exact attribution of the 11-point result between these two papers is uncertain)
- ICA combined with Gaussian process regression is an established lab approach — [arXiv 1903.07672](https://arxiv.org/pdf/1903.07672)

### Inferences
- A solo engineer can implement ICA/DVA in Python in days: smoothing (Savitzky–Golay or Gaussian), voltage-binned dQ/dV, then peak tracking. Validating it across brands and chemistries is the hard part.
- For LFP packs (many Tesla SR/Model 3 RWD, BYD, MG), the flat OCV curve makes SoC-based partial counting weak. DVA/ICA features (graphite staging peaks) are then more informative, but they need mV-level voltage resolution.
- Tesla Fleet Telemetry brick voltages and pack voltage/current are plausible inputs. Typical OEM-cloud 1-minute sampling is probably too coarse for clean dQ/dV except on slow AC charges (inference).

### Gaps
- No published comparison of ICA accuracy using OBD-polled data vs cloud telematics data on the same vehicles was found.

---

## 1e. Drive/discharge-based tests: Aviloo-style Flash (minutes) vs full-discharge test

### Takeaway
Aviloo's Premium test (full drive-down from about 100% to about 10% with an OBD logger, up to about a week of normal driving) is the de facto European reference for an independent certificate. Its Flash test (about 3 minutes) is an ML model trained on tens of thousands of Premium tests, stated to be about ±3% vs Premium. Tesla's built-in Battery Health Test is an OEM analogue using a full controlled cycle.

### Cited Findings
- **Aviloo Flash:**
  - Takes about 3 minutes and does not fully discharge the battery.
  - Uses an ML model trained on "tens of thousands of PREMIUM tests", with predictors such as vehicle age, mileage and charging behaviour.
  - Accuracy is "approximately ±3% compared to the PREMIUM Test."
  - Sources: [Aviloo – new FLASH test blog](https://aviloo.com/en/blog/the-new-aviloo-flash-test-more-clarity-more-trust-more-success); [Aviloo Certified](https://aviloo.com/en-us/aviloo-certified); [SOH.lv – Flash vs Premium](https://soh.lv/en/knowledge-base/aviloo-flash-vs-premium-test) (search summaries; vendor/distributor claims)
- **Aviloo Premium:**
  - Analyses a complete discharge cycle, with the battery "driven from full to nearly empty (around 10%)", over a period of up to seven days of normal driving.
  - The OBD box logs voltage, current, temperature and more, and the analysis is described as having "TÜV-certified accuracy."
  - Sources: [Futurez (distributor)](https://www.futurez.fi/en/shop/devices-accessories/electric-car-accessories/aviloo-premium-ev-electric-car-battery-test/); [SOH.lv](https://soh.lv/en/knowledge-base/aviloo-flash-vs-premium-test); [TÜV SÜD on Aviloo](https://www.tuvsud.com/en-us/e-ssentials-newsletter/automotive-essentials/e-ssentials-03-2022/aviloo-battery-test-for-professionals)
- **Aviloo methodology details (vendor):**
  - Its "SoCE" is an energetic SoH computed at cell level "adhering to the GTR22 standard", focusing on the weakest cell and usable energy under defined conditions.
  - It runs plausibility checks between its measured SoC/SoH and the BMS SoC/SoH to detect sensor errors.
  - It does not rely on the OEM SoH calculation.
  - Sources: [Aviloo Certified](https://aviloo.com/en-us/aviloo-certified); [Aviloo SoH white paper](https://aviloo.com/files/Aviloo/pdf/Whitepaper/AVILOO%20White%20Paper%20SoH%20ENG.pdf)
- Aviloo's fleet study found up to 13.5 percentage-point SoH variation between the best and worst examples of the same model. Individual Tesla Model Ys varied by up to 11 pp across 50,000–150,000 km — [Automotive Powertrain Technology International](https://www.automotivepowertraintechnologyinternational.com/news/battery-management/aviloo-launches-independent-study-into-used-ev-battery-health.html); [Aviloo study PDF](https://aviloo.com/files/Aviloo/Presse/Berichte/AVILOO%20Launches%20Worlds%20Largest%20Independent%20EV%20Battery%20Study.pdf)
- Owner-reported Aviloo results that disappointed owners or diverged from other tools exist (VW ID, Polestar). Examples: [VWIDTalk thread](https://www.vwidtalk.com/threads/did-the-aviloo-test-with-a-disappointing-result.13772/); [Polestar Forum: Aviloo vs SoH Checker after 5 years/70,000 km](https://www.polestar-forum.com/threads/soh-after-5-years-and-70-000-km-via-aviloo-and-soh-checker.19797/) (anecdotal)
- **Tesla Battery Health Test:** discharges from about 20% to below 10%, then charges to 100% while measuring energy in. It needs Level-2 AC, takes 24 h or more, and Tesla recommends running it rarely — [Not a Tesla App](https://www.notateslaapp.com/news/2049/teslas-battery-health-test-see-your-battery-health-in-app-or-in-service-mode); [JOWUA](https://www.jowua-life.com/blogs/tesla-owners-faq/tesla-battery-health-test-guide-everything-you-need-to-know)

### Inferences
- A solo engineer can replicate a "Premium-style" drive-down logger with an OBD/CAN logger (WiCAN, OVMS; see Q5) and energy integration from a high to a low SoC. The physics is simple.
- Building the Flash-style quick test is where scale matters. Aviloo's ±3% rests on tens of thousands of reference full-discharge tests used as labels. A new entrant must first build its own labelled reference set per model before a quick-test ML model can be credible.
- The weakest-cell / usable-energy framing matters. The usable energy a driver can extract is capped by the lowest cell, so cell-imbalance and balancing state affect "energetic SoH" more than average-cell capacity.

### Gaps
- Aviloo's Premium-test uncertainty (±% vs a lab reference) was not found. Only "TÜV-certified" and the Flash-vs-Premium ±3% were retrievable. Prices of Aviloo tests were not retrieved.

---

## 1f. Data-driven / ML models (Gaussian processes, LSTMs, transfer learning) trained on lab datasets

### Takeaway
On lab cells, ML SoH estimators routinely reach about 1–2% error (often below 1%). Landmark results include Severson 2019 (9.1% cycle-life prediction error) and Roman 2021 (GPR/RF/BRR/deep ensembles on 179 cells). These numbers do not transfer directly to vehicle packs: field data are noisy, irregular and partial, and models "not based on realistic driving data are likely to be inaccurate in the field." Transfer learning from lab to field is an active research area, not a solved one.

### Cited Findings
- **Severson et al., Nature Energy 2019:**
  - 124 commercial A123 LFP/graphite cells, fast-charged under 72 protocols, with cycle lives of 150–2,300.
  - Achieved 9.1% test error predicting cycle life from the first 100 cycles, and 4.9% classification error using the first 5 cycles.
  - Sources: [Nature Energy](https://www.nature.com/articles/s41560-019-0356-8); [MIT PDF](https://web.mit.edu/braatzgroup/Severson_NatureEnergy_2019.pdf); [TRI](https://www.tri.global/research/data-driven-prediction-battery-cycle-life-capacity-degradation)
- **Roman et al., Nature Machine Intelligence 2021:** an ML pipeline on 179 cells comparing Bayesian ridge regression, GPR, random forest and a deep NN ensemble (with uncertainty). The best algorithm depended on the charging protocol: RF for CC-CV and fast charge, BRR for CC — [Nature Machine Intelligence](https://www.nature.com/articles/s42256-021-00312-3); [arXiv 2102.00837](https://arxiv.org/pdf/2102.00837)
- **Short-segment approaches:**
  - SoH error as low as 1.97% from "super-short" charging covering a 10% SoC span — [PMC12463020](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12463020/)
  - An RNN on 6-minute 1C partial-discharge data, stable across SoC windows — [Batteries 2025, 11(7):236](https://doi.org/10.3390/batteries11070236) (search summaries, lab data)
- Transfer learning for SoH under fast charging — [PMC12033934](https://pmc.ncbi.nlm.nih.gov/articles/PMC12033934/)
- **Lab-to-field gap:**
  - "Much current research relies on laboratory data that does not accurately reflect field conditions … the quality of field datasets is far from ideal which makes it incompatible with most state-of-the-art data-driven techniques."
  - Real EV batteries see dynamic loads, irregular charging, varied environments and user-dependent patterns.
  - The commonly used EKF for SoC/capacity "can lose accuracy or even diverge when deployed in the field," and "any SoH algorithms not based on realistic driving data are likely to be inaccurate in the field."
  - Sources: [Batteries 2026 review, 12(5):174](https://doi.org/10.3390/batteries12050174); [Springer chapter on field-data challenges](https://link.springer.com/chapter/10.1007/978-3-032-12579-8_71); [eTransportation 2024, "Towards real-world SoH estimation Part 2"](https://www.sciencedirect.com/science/article/abs/pii/S2590116824000511); [Joule 2023, "Analysis and key findings from real-world EV field data"](https://www.sciencedirect.com/science/article/pii/S2542435123003161) (search summaries; the exact attribution of each quoted line among these sources is not confirmed)
- Data-driven ML "offer superior accuracy and adaptability but often require extensive datasets" — [Energies 2025 review](https://doi.org/10.3390/en18020337)
- SoH publications rose from about 350 to over 700 per year by 2024 — [Batteries 2026 review](https://doi.org/10.3390/batteries12050174) (search summary)
- **BatteryML (Microsoft):**
  - MIT license. Unifies 7 public lab datasets (CALCE, MATR, HUST, HNEI, RWTH, SNL, UL_PUR).
  - Offers linear/GPR/PLSR/XGBoost/RF/MLP/CNN/LSTM/Transformer baselines.
  - The repository was **archived (read-only) on 15 Sept 2026**.
  - Source: [microsoft/BatteryML](https://github.com/microsoft/BatteryML); [arXiv 2310.14714](https://arxiv.org/pdf/2310.14714)

### Inferences
- A solo engineer can reproduce lab-grade ML SoH (1–2%) on public datasets in a few weeks with BatteryML, BEEP and scikit-learn/GPyTorch. That is a portfolio exercise, not a product. The product-critical asset is labelled vehicle data: vehicle pack capacity measured by a reference method.
- GPR is attractive for a certificate because it gives calibrated uncertainty ("SoH 91 ± 2%, 95% CI"). Deep models need ensembles or conformal prediction to match.
- Because BatteryML is archived, depending on it for a product is a maintenance risk. PyBaMM and BEEP remain active (see Q4).

### Gaps
- No peer-reviewed result was found that trained purely on lab cells and hit ≤2% on real vehicle packs without field labels.

---

## 1g. EIS and pulse-resistance methods

### Takeaway
EIS gives rich degradation information on cells and modules, and pulse tests can approximate it faster. But pack-level EIS on a road vehicle needs either OEM-integrated hardware (EIS-capable BMS chips are only now arriving) or HV-contact equipment. For a solo engineer, pulse resistance derived from driving or charging current steps (ΔV/ΔI) is feasible as a secondary health indicator (power fade), not as the primary capacity-SoH measurement.

### Cited Findings
- Calibrated EIS and time-domain measurements were made on a 7 kWh automotive module with 396 cylindrical cells. This addressed a gap: most EIS studies look at single cells or low-voltage modules, not high-voltage packs — [Batteries & Supercaps 2023 (Kasper et al.)](https://chemistry-europe.onlinelibrary.wiley.com/doi/10.1002/batt.202200415)
- EIS was reconstructed from time-domain pulses on a 3.7 kWh module. Rapid pulse tests extract similar electrochemical information (ohmic resistance, time constants) with a 67% reduction in measurement time — [Electrochem 2025, 6(2):17](https://doi.org/10.3390/electrochem6020017)
- A Marelli-designed EIS-based BMS was "due out in 2025 for commercial use," bringing lab EIS into automotive BMS — [Electronic Design](https://www.electronicdesign.com/markets/automotive/article/55269369/electronic-design-electrochemical-impedance-spectroscopy-for-automotive-bms-applications)
- A dataset exists for rapid SoH estimation from EIS plus ML — [PMC10293954](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10293954/)
- The Stanford real-driving aging dataset includes periodic HPPC and EIS reference tests alongside capacity (see Q3) — [Data in Brief 2022](https://www.sciencedirect.com/science/article/pii/S2352340922002062)
- `impedance.py` (MIT) offers scikit-learn-style equivalent-circuit fitting for EIS — [ECSHackWeek/impedance.py](https://github.com/ECSHackWeek/impedance.py)

### Inferences
- Resistance correlates with capacity fade but is strongly temperature- and SoC-dependent. It is useful for flagging abnormal packs, and for "power SoH", but a capacity-SoH certificate built only on resistance would be weak.
- An in-house pack EIS rig (HV, isolation, safety certification) is out of scope for a solo founder.

### Gaps
- No commercial road-EV SoH service using on-vehicle EIS was found with published accuracy. No quantitative accuracy of resistance-only SoH for vehicle packs was found.

---

## 1h. Fleet-level statistical approaches using charger (OCPP meter value) data

### Takeaway
OCPP `MeterValues` can carry energy, power, voltage, current and (sometimes) the EV's SoC at about 1-minute intervals. That is enough in principle for ΔkWh/ΔSoC capacity estimates across many sessions, from the charger side and without touching the car. Accuracy is limited by coarse SoC reporting (often unavailable on AC), charger/on-board-charger losses, and not knowing the vehicle model.

### Cited Findings
- `MeterValues.req` can contain up to 22 measurands (power, energy, voltage, current, SoC of the EV battery…), typically sampled at intervals such as 1 minute — [Ampcontrol OCPP guide](https://www.ampcontrol.io/ocpp-guide/how-to-send-ocpp-meter-values-with-metervalues-req); [AMPECO OCPP handbook 2026](https://www.ampeco.com/guides/complete-ocpp-guide/)
- An IEEE paper estimates EV SoH from charger-measured variables sent via OCPP, using coulomb counting plus a model of the vehicle charging-system losses — [IEEE Xplore 10372240](https://ieeexplore.ieee.org/document/10372240/)
- A related Nature Energy study on home-storage systems shows that multi-year field measurements can be used for capacity estimation — [Nature Energy 2024](https://www.nature.com/articles/s41560-024-01620-9) (stationary, not EV)

### Inferences
- The OCPP route is attractive commercially (partnering with CPOs or fleet depots, no dongle), but technically noisy.
  - SoC is generally only available on DC charging, via ISO 15118 or CHAdeMO; on AC it is usually absent (inference from protocol design).
  - DC fast-charging SoC windows (say 20→80%) are wide enough for about 3% per-session estimates under the error propagation in 1c. Averaging over many sessions per vehicle tightens that.
- Vehicle identification (VIN or model) is needed to normalise against the nominal capacity. It is often unavailable to CPOs unless Plug&Charge or fleet tagging is used.

### Gaps
- No published accuracy numbers for OCPP-only SoH were retrievable. How often CPO data actually includes SoC measurands across chargers was not found.

---

## 2. Typical accuracy in literature vs commercial products; lab-to-vehicle gap; temperature, SoC-window, balancing and buffer effects

### Takeaway
The best field-data research methods report about 1–2% average error (outliers up to about 4%) against offline reference tests. The published commercial quick-test benchmark is Aviloo Flash at about ±3% vs its own full-discharge test. The regulatory tolerance for on-board SoH monitors (UN GTR 22) is a 5% band. Lab-cell results (below 1%) overstate what is achievable on vehicles. Buffers, OEM SoH definitions, temperature and SoC-window choice routinely introduce errors larger than the algorithm's own error.

### Cited Findings
- **Field research accuracy:**
  - Virtual full-charge method: <2% error, average <1%, maximum outlier <4% ([Batteries 2026](https://doi.org/10.3390/batteries12010010)).
  - Interval capacity: 0.28% MAPE ([Energy 2022](https://www.sciencedirect.com/science/article/abs/pii/S0360544222016747)).
  - Domain-knowledge ML: 1.5–2.5% maximum error ([Comms Eng 2024](https://www.nature.com/articles/s44172-024-00304-2)).
  - ICA on EVs: about 2% RMSE ([JES 2023](https://www.sciencedirect.com/science/article/pii/S2352152X23005078)).
  - (search summaries)
- **Commercial:** Aviloo Flash is about ±3% vs Premium ([Aviloo](https://aviloo.com/en/blog/the-new-aviloo-flash-test-more-clarity-more-trust-more-success)). TWAICE offers an insured accuracy guarantee (backed by Great Lakes Insurance / Munich Re, aiSure) for its battery-analytics results, but no percentage was retrievable ([TWAICE newsroom](https://www.twaice.com/newsroom/twaice-guaranteed-accuracy-of-battery-analytics); [Munich Re aiSure factsheet](https://www.munichre.com/content/dam/munichre/contentlounge/website-pieces/documents/aiSure_Case_Study_Twaice_Factsheet.pdf/_jcr_content/renditions/original./aiSure_Case_Study_Twaice_Factsheet.pdf)).
- **Regulatory benchmark (UN GTR 22):**
  - Part A verifies the on-board SoCE monitor by running a WLTP test to measure actual usable battery energy (UBE) and comparing it with the displayed SoCE.
  - The 5% criterion for Part A was proposed by Japan (EVE 34-15) and agreed by the working group.
  - ECUs can estimate SoCR/SoCE with 1% or 0.1% resolution, "though consistency with the 5% criteria … cannot always be ensured."
  - GTR 22 continues to be amended (Phase IV, OICA comments March 2026).
  - Sources: [UNECE EVE-45 document](https://wiki.unece.org/download/attachments/123667846/EVE-45-05e.pdf?api=v2); [HORIBA GTR 22 overview](https://www.horiba.com/int/mobility/applications/emissions-performance-and-durability/exhaust-emissions/gtr-no22/); [MDPI Batteries 2023, experimental application of GTR 22](https://www.mdpi.com/2313-0105/9/9/454); [OICA comments EVE-95, 16 Mar 2026](https://wiki.unece.org/download/attachments/326369633/EVE-95-13e%20-%20UN%20GTR%2022%20OICA%20comments.pdf?api=v2) (search summaries)
- **Unit-to-unit spread:** up to 13.5 pp SoH spread within one model, and up to 11 pp for Tesla Model Y at 50–150k km ([APTI on Aviloo study](https://www.automotivepowertraintechnologyinternational.com/news/battery-management/aviloo-launches-independent-study-into-used-ev-battery-health.html)). A model-average "expected SoH" from age and mileage alone therefore cannot certify an individual car.
- **Buffer and OEM definition effects:**
  - E-GMP OBD SoH reads 100% until energy at full charge drops below about 70 kWh from about 74 kWh new ([IoniqForum](https://www.ioniqforum.com/threads/understanding-soh-and-degradation.53005/)).
  - A BMS jumped from 80% to 100% after a software update ([Aviloo](https://aviloo.com/en-us/read-out-vs-testing)).
  - Tesla's CAN exposes `BMS_energyBuffer` separately from nominal energy ([model3dbc](https://github.com/joshwardell/model3dbc)).
- **Field data quality:** cloud BMS data quality is "suboptimal" and cathode heterogeneity blocks universal methods ([Applied Energy 2025](https://www.sciencedirect.com/science/article/abs/pii/S0306261925010645)). A large field study (300 EVs over three years) documents disparities between field and lab data ([Joule 2023](https://www.sciencedirect.com/science/article/pii/S2542435123003161)) (search summary).

### Inferences
- Realistic accuracy tiers for a solo-built product:
  - Read-out only: unknown and brand-dependent; not a measurement.
  - Single partial charge with a wide window (≥50 pp) and BMS SoC: about ±3–5%.
  - Multi-session aggregated partial-charge/energy counting with OCV-rest endpoints and temperature normalisation: about ±2–3%.
  - Full controlled discharge/charge (Premium-style): about ±1–2% vs a reference, if temperature is controlled. These tiers are the author's synthesis from the numbers above.
- Temperature: usable energy at low temperature is lower. A credible certificate should normalise to a reference temperature (25 °C), or refuse tests below a threshold.
- Balancing: an unbalanced pack under-delivers usable energy (weakest cell) even with good average cell capacity. Brick min/max voltages (Tesla) or cell-voltage PIDs (HKMC) should be checked, and top-balancing may need a full charge beforehand.
- Pick one definition and state it on the certificate: capacity SoH (Ah), energetic SoH (kWh, GTR 22-style SoCE), or range-based. Much market confusion comes from mixing these.

### Gaps
- GTR 22 minimum performance thresholds (commonly cited as 80% SoCE at 5 years/100,000 km and 70% at 8 years/160,000 km) could not be verified against the regulation text in this session. The EU Battery Regulation and Euro 7 durability/SoH provisions were not researched due to budget.
- No independent (non-vendor) head-to-head comparison of Aviloo, Recurrent, OEM SoH and lab capacity tests on the same vehicles was found.

---

## 3. Public datasets (lab and real-vehicle) and their licenses

### Takeaway
Lab-cell data are abundant and mostly openly licensed: MIT/Stanford/Toyota (Severson), Oxford (ODbL), CALCE, NASA, Sandia/SNL, HUST, RWTH, and Stanford's real-driving-profile cells. Real-vehicle data with trustworthy capacity labels are scarce. The main open vehicle sources are the Chinese EV fleet charging-snippet datasets (EVBattery / battery fault detection, three anonymised manufacturers), the BMW i3 real-driving dataset (72 trips, no aging labels), and small academic sets. There is no open fleet dataset with reference full-capacity tests per vehicle.

### Cited Findings
- **Severson/MIT–Stanford–TRI:** 124 A123 APR18650M1A LFP cells, 72 fast-charge protocols, 30 °C, 4C discharge. Raw data at data.matr.io; mirrored on Kaggle — [Kaggle MIT dataset](https://www.kaggle.com/datasets/rickandjoe/mit-battery-degradation-dataset); [Severson paper](https://web.mit.edu/braatzgroup/Severson_NatureEnergy_2019.pdf)
- **Oxford Battery Degradation Dataset 1:** 8 small Li-ion pouch cells; Open Database License (ODbL 1.0), with contents under the Database Contents License — [Oxford ORA](https://ora.ox.ac.uk/objects/uuid:03ba4b01-cfed-46d3-9b1a-7d4a7bdf6fac/files/m43cc05e7c5f1245f4895d9dbd495e52f) (search summary)
- **Stanford (Pozzato, Allam, Onori, Data in Brief 2022):**
  - 10 INR21700-M50T (Si-graphite/NMC) cells cycled for 23 months with UDDS drive-profile discharge and CC-CV charging at C/4–3C, at 23 °C.
  - Periodic RPTs: capacity, HPPC, EIS.
  - Sources: [ScienceDirect](https://www.sciencedirect.com/science/article/pii/S2352340922002062); [PMC8892076](https://pmc.ncbi.nlm.nih.gov/articles/PMC8892076/); [Stanford Report](https://news.stanford.edu/stories/2023/08/improving-ev-batteries-real-world-driving-data)
  - A Stanford second-life dataset on grid-storage cycling also exists — [ScienceDirect 2024](https://www.sciencedirect.com/science/article/pii/S2352340924010084)
- **BMW i3 real driving (Steinstraeter, Buberger, Trifonov, IEEE DataPort, open access, Oct 2020):**
  - 72 trips of a 2014 BMW i3 (60 Ah) around Munich, at 10 Hz (736,983 records), summer and winter.
  - Battery V/I/T/SoC plus heating and environment signals. Useful for driving/thermal modelling; no aging labels.
  - Source: [IEEE DataPort](https://ieee-dataport.org/open-access/battery-and-heating-data-real-driving-cycles)
- **Chinese EV fleet charging data:**
  - The battery fault-detection dataset (Peking University et al.) has charging time series from three anonymised manufacturers ("battery_brand1–3"), with fault labels, car number, charge-segment number and mileage. It is hosted on OneDrive and a PKU server — [962086838/Battery_fault_detection_NC_github](https://github.com/962086838/Battery_fault_detection_NC_github)
  - The EVBattery dataset (He et al. 2023, NeurIPS Datasets & Benchmarks; arXiv 2201.12358) is used for capacity-estimation benchmarks (XGBoost, LSTM, RF, MLP, GatedCNN) — [iMohammad97/evbattery-dataset](https://github.com/iMohammad97/evbattery-dataset); [en-research/GenEVBattery](https://github.com/en-research/GenEVBattery)
  - A 2025 Nature Communications paper, "Multi-modal framework for battery SoH evaluation using open-source EV data", appears in the same context as a released field dataset of 464 EVs from three manufacturers with over 1.2 million charging snippets — [Nature Communications 2025](https://www.nature.com/articles/s41467-025-56485-7); [PMC11779878](https://pmc.ncbi.nlm.nih.gov/articles/PMC11779878/) (search summary; whether the 464-EV dataset is the same as EVBattery, and its license, are unconfirmed)
  - Capacity labels in these datasets are field-derived (for example from charging segments or mileage), not reference lab tests (GenEVBattery README mentions "mileage labels").
- **BatteryML's 7 unified lab datasets:** CALCE, MATR, HUST, HNEI, RWTH, SNL, UL_PUR, covering LCO/LFP/NMC/NCA with 10–180 cells each — [microsoft/BatteryML](https://github.com/microsoft/BatteryML)
- Dataset comparisons: [Volta Foundation BatteryBits](https://medium.com/batterybits/comparison-of-open-datasets-for-lithium-ion-battery-testing-fd0de091ca2); [Scientific Data 2024 multi-stage aging dataset](https://www.nature.com/articles/s41597-024-03859-z); [System Research in Energy analysis](https://systemre.org/index.php/journal/article/view/938)
- A recent repository (July 2026) builds SoH models on "Dataset Gold", derived from the NeurIPS 2023 battery dataset, with "Top-10" reference SoH labelling — [guimatiolli/SOH_EV_Real_Data](https://github.com/guimatiolli/SOH_EV_Real_Data)

### Inferences
- Commercial-use licensing needs checking dataset by dataset. ODbL (Oxford) allows commercial use with share-alike on derived databases. The Chinese fleet datasets have no explicit license in the READMEs seen, which is a risk for a commercial product.
- None of the open vehicle datasets map to a specific European make/model with known nominal capacity. A solo founder will have to create a proprietary labelled dataset, for example 20–50 vehicles per key model with full-cycle reference tests. That is the real moat and the real cost.

### Gaps
- Licenses for NASA PCoE, CALCE, Sandia/Battery Archive, HUST and RWTH could not be verified this session. Tesla Model 3 owner-data repositories (for example TeslaMate exports) on GitHub/Kaggle were not found or checked.

---

## 4. Open-source software for SoH work

### Takeaway
A complete open toolchain exists:
- Vehicle access: python-can (PCAN, Kvaser, slcan/gs_usb for CANable, SocketCAN, Vector…), python-udsoncan (UDS), python-OBD (standard PIDs), and OVMS or WiCAN firmware for always-on logging.
- PID/DBC knowledge: ABRP ev-obd-pids, the JejuSoul HKMC PIDs, model3dbc.
- Modelling: PyBaMM (physics), BEEP (featurisation), impedance.py (EIS), BatteryML (ML baselines, now archived).

### Cited Findings
- **python-can** (LGPL-3.0) has interface backends including `pcan`, `kvaser`, `slcan`, `gs_usb`, `socketcan`, `vector`, `ixxat`, `neovi`, `etas`, `nixnet`, `seeedstudio`, `usb2can` and `cantact`. Directory listing of `doc/interfaces`: [hardbyte/python-can](https://github.com/hardbyte/python-can)
- **python-udsoncan:** an ISO 14229 UDS implementation in Python 3, MIT — [pylessard/python-udsoncan](https://github.com/pylessard/python-udsoncan)
- **python-OBD:** for ELM327 adapters, strong on Mode 01 standard PIDs; manufacturer-PID support is not documented on the front page; GPL v2 — [brendan-w/python-OBD](https://github.com/brendan-w/python-OBD)
- **OVMS v3:**
  - Open-source remote monitoring, diagnosis and control; MIT.
  - ESP32 with 16 MB flash, WiFi/BT, three CAN buses and a cellular modem (v3.3 uses SIM7600G LTE).
  - 40+ vehicle integrations, including Tesla Model S/Roadster, Leaf, BMW i3, Bolt, Zoe, I-Pace and Soul EV.
  - About 7,500 commits.
  - Source: [openvehicles/OVMS3](https://github.com/openvehicles/Open-Vehicle-Monitoring-System-3)
- **EVNotify:** Android app with OBD dongle, originally for Hyundai Ioniq charge monitoring; the repo holds v2 code with v3 "under active development" — [EVNotify/EVNotify](https://github.com/EVNotify/EVNotify)
- **PyBaMM:** SPM/SPMe/DFN plus degradation submodels (SEI, lithium plating, LAM); BSD-3-Clause; NumFOCUS-sponsored; actively maintained — [pybamm-team/PyBaMM](https://github.com/pybamm-team/PyBaMM)
- **BEEP (TRI):** cycler-data structuring (Arbin, Maccor, BioLogic, Neware, Novonix, Battery Archive), featurisation including Severson features; Apache-2.0 — [TRI-AMDD/beep](https://github.com/TRI-AMDD/beep)
- **impedance.py:** EIS equivalent-circuit fitting; MIT — [ECSHackWeek/impedance.py](https://github.com/ECSHackWeek/impedance.py)
- **BatteryML:** MIT; archived 15 Sept 2026 — [microsoft/BatteryML](https://github.com/microsoft/BatteryML)
- **ABRP ev-obd-pids** (Apache-2.0), **JejuSoul HKMC PIDs** (no license) and **model3dbc** (MIT; works with Vector/Kvaser/PEAK tools, SavvyCAN, CANBUS-Analyzer, CANserver) — [iternio/ev-obd-pids](https://github.com/iternio/ev-obd-pids); [JejuSoul](https://github.com/JejuSoul/OBD-PIDs-for-HKMC-EVs); [model3dbc](https://github.com/joshwardell/model3dbc)
- The AWS IoT FleetWise EV battery-monitoring sample exists as a cloud-pipeline reference — [aws-samples/aws-iot-fleetwise-evbatterymonitoring](https://github.com/aws-samples/aws-iot-fleetwise-evbatterymonitoring)

### Inferences
- Licensing matters for a commercial product:
  - GPL (python-OBD GPLv2, WiCAN firmware GPLv3) and LGPL (python-can) impose obligations if distributed or linked.
  - MIT/Apache/BSD tools (udsoncan, OVMS, PyBaMM, BEEP, impedance.py, ev-obd-pids) are safer to embed.
  - The JejuSoul PIDs have no license, so their data can inform the work but should not be copied verbatim into a product.
- MATLAB/Simulink experience maps well onto an EKF/UKF capacity estimator prototype and code generation, but the Python stack above is sufficient on its own.

### Gaps
- MATLAB Simscape Battery / Battery Management toolbox capabilities and licensing were not researched (search budget exhausted). Car Scanner, LeafSpy and ScanMyTesla are closed-source apps; their PID coverage was not verified.

---

## 5. Hardware for reading EV data at home; secure-gateway bypass legality

### Takeaway
About €40–145 buys a capable OBD adapter:
- OBDLink MX+ (about €100–145, fastest ELM327/STN-class).
- Vgate iCar Pro / vLinker (about €30–50).
- WiCAN, an open ESP32 device with slcan/SocketCAN and MQTT ($42 standard, $89 PRO).

Avoid cheap "v2.1" ELM327 clones. Raw CAN interfaces (PEAK PCAN, Kvaser, CANable) are needed only for sniffing or high-rate logging. Secure gateways (Stellantis/FCA since 2018, and others) block some access, and legitimate unlocking goes through registration schemes such as AutoAuth. Bypass cables exist, but their legality was not established.

### Cited Findings
- **OBDLink MX+:** about €100–145; "roughly three times faster than a good rival"; works with phone and laptop, with sleep mode. **Vgate iCar Pro 2S:** €35–50 (Classic BT + BLE). **iCar Pro BLE 4.0:** €30–45 — [Iamcarhacker MX+ review](https://iamcarhacker.com/obdlink-mx-review/); [Iamcarhacker best ELM327 adapters](https://iamcarhacker.com/best-elm327-obd2-adapters/); [vLinker MS review](https://iamcarhacker.com/vgate-vlinker-ms-owners-review/)
- Cheap "ELM327 v2.1" dongles are typically clones of v1.5 firmware with a bumped version number and "may have quirks on some protocols" — [CarCodeFinder](https://carcodefinder.com/guides/best-elm327-dongles/); [OBDadvisor](https://obdadvisor.com/elm327/) (search summary)
- LeafSpy has a community list of known-working adapters — [MyNissanLeaf forum](https://mynissanleaf.com/threads/leafspy-compatible-adapters-known-working-updated-14-03-2022.33159/)
- **WiCAN:**
  - ESP32-C3; CAN 2.0A/B up to 1 Mbit/s; emulates ELM327 v2.3 and ELM329.
  - SocketCAN/slcan, SavvyCAN/RealDash, MQTT and Home Assistant integration, "automatic vehicle profiles for EV state-of-health and charge tracking."
  - Sleep current below 1 mA. **PRO $89, Standard $42.** GPL-3.0.
  - Source: [meatpiHQ/wican-fw](https://github.com/meatpiHQ/wican-fw)
- OVMS v3 hardware: ESP32, three CAN buses, LTE modem — [OVMS3](https://github.com/openvehicles/Open-Vehicle-Monitoring-System-3)
- **FCA/Stellantis secure gateway:**
  - Fitted since 2018 to block remote CAN hacking. It also blocks aftermarket scanners from clearing codes and doing bi-directional functions.
  - The sanctioned route is AutoAuth registration: $50/year for up to 6 users.
  - Sources: [YouCanic](https://www.youcanic.com/fca-security-gateway-module-explained-obd2-sgm-sgw/); [RepairSolutionsPRO/AutoAuth](https://pro.repairsolutions.com/chrysler-secure-gateway); [Autel SGW](https://autel.us/secure-gateway-access/)
  - AutoAuth reportedly became non-functional for European customers from 1 Sept 2025 (IP-restricted) — [DiagStore.ie](https://www.diagstore.ie/blog/unlocking-the-sgw-on-fca-vehicles/) (search summary)
  - Bypass cables exist to connect directly past the gateway — [YouCanic](https://www.youcanic.com/fca-security-gateway-module-explained-obd2-sgm-sgw/); [Mobile Eco Tuning SGW access](https://shop.mobileecotuning.com/sgwaccess/)

### Inferences
- Reading SoH DIDs is a read-only diagnostic request. On many vehicles, gateways permit read services and block writes and resets (inference; varies by OEM). The FCA material above describes blocking of code-clearing and bi-directional functions, not of all reads.
- For a commercial product, rely on read-only UDS through the OBD port or official cloud APIs. Avoid gateway-bypass cables: they touch in-vehicle wiring, may void warranty, and their legal status (EU type-approval RMI rules, SERMI, US DMCA) is unresolved in these notes.
- A home lab setup costs well under €500: OBDLink MX+ (€145), a WiCAN PRO ($89) for permanent logging, and a CANable/gs_usb-class USB-CAN for sniffing (price not verified).

### Gaps
- PEAK PCAN-USB, Kvaser Leaf and CANable prices were not retrieved. The legality of secure-gateway bypass cables in the EU (Regulation 2018/858 RMI access, SERMI scheme) and in the US (DMCA §1201 exemptions, state right-to-repair laws) could not be researched because the search budget was exhausted.

---

## 6. How to validate an SoH estimate credibly, and what error targets (±2%, ±3%, ±5%) are credible for a certificate

### Takeaway
Credible validation needs a reference measurement on the same vehicle. The gold standard is a controlled full charge/discharge energy or capacity test at controlled temperature: a Premium-style drive-down, Tesla's Battery Health Test, or a dyno WLTP UBE measurement as in GTR 22 Part A. It should be supplemented by comparison with the OEM dealer tool and, ideally, by teardown/cell tests on a few packs. Against this, ±5% matches the regulatory tolerance for on-board monitors; ±3% matches the leading commercial quick test (Aviloo Flash vs Premium); ±2% is achievable only with full-cycle or multi-session methods and demonstrated per model.

### Cited Findings
- GTR 22 Part A verifies on-board SoCE monitors by measuring UBE on a WLTP test in the lab and comparing it with the displayed value, using a 5% criterion agreed in the working group — [UNECE EVE-45](https://wiki.unece.org/download/attachments/123667846/EVE-45-05e.pdf?api=v2); [HORIBA](https://www.horiba.com/int/mobility/applications/emissions-performance-and-durability/exhaust-emissions/gtr-no22/); [MDPI Batteries 2023](https://www.mdpi.com/2313-0105/9/9/454)
- Aviloo Flash is stated as about ±3% vs Premium; Premium is presented with "TÜV-certified accuracy" and is the basis of Aviloo certificates — [Aviloo](https://aviloo.com/en/blog/the-new-aviloo-flash-test-more-clarity-more-trust-more-success); [TÜV SÜD](https://www.tuvsud.com/en-us/e-ssentials-newsletter/automotive-essentials/e-ssentials-03-2022/aviloo-battery-test-for-professionals)
- Field research validates against "offline validation tests" and reports <2% (average <1%, outliers to 4%) — [Batteries 2026](https://doi.org/10.3390/batteries12010010)
- A consumer OBD SoH can differ "significantly" from dealer KDS/GDS output on Kia/Hyundai. This implies dealer-tool comparison is a necessary but not sufficient check — [Kia Niro Forum](https://www.kianiroforum.com/threads/how-to-determine-your-battery-state-of-health-no-its-not-thru-the-obd2-port.13593/)
- TWAICE's approach to credibility is a third-party-insured accuracy guarantee (Munich Re aiSure) — [TWAICE](https://www.twaice.com/newsroom/twaice-guaranteed-accuracy-of-battery-analytics); [Munich Re factsheet](https://www.munichre.com/content/dam/munichre/contentlounge/website-pieces/documents/aiSure_Case_Study_Twaice_Factsheet.pdf/_jcr_content/renditions/original./aiSure_Case_Study_Twaice_Factsheet.pdf)
- Tesla's Battery Health Test provides an OEM full-cycle reference: below 10% → 100% on L2 AC, 24 h or more — [Not a Tesla App](https://www.notateslaapp.com/news/2049/teslas-battery-health-test-see-your-battery-health-in-app-or-in-service-mode)

### Inferences
- A practical validation protocol for a solo founder:
  1. For each target model, recruit N ≥ 20–30 cars across mileage.
  2. On each, run the reference test: full charge to 100% with a balancing hold, rest ≥2 h, drive or discharge to ≤10% with continuous V/I logging at a mild ambient temperature, then energy-integrate at the DC side.
  3. Repeat on a subset to measure test-retest repeatability; this sets the floor on achievable accuracy.
  4. Compare the quick method against the reference. Report bias, RMSE and the 95th-percentile absolute error.
  5. Also record the OEM dealer-tool SoH and the OBD BMS SoH.
  6. Publish the definition used (capacity vs energetic) and the temperature normalisation.
- Credible certificate claims: "±5% (95% of cases)" is defensible early. "±3%" needs a few hundred reference tests per platform family. "±2%" should only be claimed for full-cycle-measured certificates, not quick tests.
- Accreditation or third-party audit (for example by a TÜV/DEKRA-type body, as with Aviloo) and an insurance-backed guarantee (as with TWAICE) are the market's credibility signals. Both cost money and time beyond pure engineering.

### Gaps
- No published standard specifically for used-EV SoH certificates (beyond GTR 22 monitors) was found in this session. The status of the EU battery passport/SoH-reporting rules and of the SAE J1798/J3xxx family was not checked.
- Test-retest repeatability of full drive-down tests on real vehicles was not found in the sources accessed.

---

## 7. Can a single engineer build an accurate SoH estimation product?

### Takeaway
Yes for a narrow scope, no for a broad one. A solo engineer with Python/MATLAB and CAN skills can build, within about 3–6 months, a read-out plus independent partial-charge/full-cycle energy-counting product for 2–5 well-documented platforms. Good candidates are Hyundai/Kia E-GMP and earlier HKMC, Renault Zoe, Nissan Leaf, and Tesla via Fleet Telemetry. With validated ±3–5% accuracy, that is a defensible product. Matching Aviloo-class multi-brand quick tests at ±3% needs thousands of labelled reference tests, per-model PID reverse-engineering and third-party certification. Those are data-, time- and capital-bound, not skill-bound.

### Cited Findings
- The PID/DBC knowledge for several brands is already open: [iternio/ev-obd-pids](https://github.com/iternio/ev-obd-pids); [JejuSoul HKMC](https://github.com/JejuSoul/OBD-PIDs-for-HKMC-EVs); [model3dbc](https://github.com/joshwardell/model3dbc)
- Open hardware and firmware for continuous logging exist: WiCAN ($42–89, GPL-3.0) and OVMS v3 (MIT) — [WiCAN](https://github.com/meatpiHQ/wican-fw); [OVMS](https://github.com/openvehicles/Open-Vehicle-Monitoring-System-3)
- Tesla Fleet Telemetry exposes pack V/I, nominal full-pack energy and brick voltages at about $0.00667 per car-hour for comparable data (Teslemetry's comparison) — [fleet-telemetry proto](https://github.com/teslamotors/fleet-telemetry/blob/main/protos/vehicle_data.proto); [Teslemetry](https://teslemetry.com/blog/tesla-fleet-api-pay-per-use)
- The leading quick-test vendor's ±3% relies on ML trained on "tens of thousands" of full-discharge tests — [Aviloo](https://aviloo.com/en/blog/the-new-aviloo-flash-test-more-clarity-more-trust-more-success)
- Recurrent's model draws on about 30,000 connected vehicles and tens of millions of trips — [Recurrent FAQ](https://www.recurrentauto.com/dealers/faq); [Charged EVs](https://chargedevs.com/newswire/recurrent-reports-offer-battery-and-range-info-for-65000-used-evs/)
- Field-data SoH methods at under 2% have been published, but with pre-processing described as "labor intensive" — [Batteries 2026](https://doi.org/10.3390/batteries12010010)
- Within-model SoH spread of up to 11–13.5 pp means statistical priors (age/mileage) cannot replace a measurement — [APTI/Aviloo study](https://www.automotivepowertraintechnologyinternational.com/news/battery-management/aviloo-launches-independent-study-into-used-ev-battery-health.html)

### Inferences
- **Recommended technical route** (synthesis):
  1. Start with OBD/UDS read-out plus an independent energy-count test, a "Premium-lite" drive-down or a wide-window charge. Use WiCAN or OBDLink with python-can/udsoncan, on 2–3 HKMC/Renault/Leaf platforms where SoH and cell-voltage PIDs are open.
  2. Add Tesla through Fleet Telemetry using `NominalFullPackEnergy`, V/I and brick voltages.
  3. Build a labelled reference database from every full test performed.
  4. Only once there are several hundred labels per platform, train a quick-test ML model (GPR for calibrated uncertainty), with ICA/DVA and BMS-SoH features.
- The main risks are not algorithmic:
  - Per-model PID coverage and OEM firmware changes (SoH jumps after updates).
  - Secure-gateway lock-downs.
  - Reference-data acquisition cost.
  - Credibility: third-party audit and insurance.
  - Competition from incumbents with large label sets (Aviloo, Recurrent, TWAICE, Volytica).
- Tesla (Fleet Telemetry) and HKMC (open DIDs) are the fastest paths to a working MVP. VW MEB, BMW, Mercedes and Stellantis will need more reverse-engineering or aggregator access.

### Gaps
- No public data on development cost or time for existing SoH vendors was found. No evidence was found of a solo-founder SoH product that reached certified accuracy.
- Volytica's published accuracy could not be retrieved (site blocked). Its public positioning is AI plus physics-based diagnostics of operating data — [volytica](https://www.volytica.com/); [ESS News interview](https://www.ess-news.com/2025/08/28/volytica-on-maximizing-battery-value-with-advanced-diagnostics/)
