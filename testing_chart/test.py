import matplotlib.pyplot as plt
data ="Sales Order	Process Order	Customer	Qty	Item Name	Mat Efficiency	Over .€.	Fab Complete	Over Hrs	Lab Complete	Over	Job Size	Promise Date	Sales	Engineer
										Hrs			Person	
164067	40060	Flynn Management & Contractors Ltd	1	Bespoke Kent Wayfinding Totem Grade 316SS Powdercoated Finish	99.33%	-14	0.00%	0	344.79%	83	D	29/09/2023	Sean Kelly	Sean O’Brien
164491	48305	Maylim Limited	264	Blackfriars: M200 DS0.0 Slot Channel - Width: 220 mm/ Height: 230 mm/ Grade: 316 S/S Meters of.	101.26%	274	0.00%	0	24.99%	-148	B	16/06/2023	Brendan Cloney	David Lehnardt
164598	41076	Ward & Burke Construction Ltd	1	RINGSEND LAUNDER TEST SECTION	296.24%	946	100.00%	0	296.22%	27	E	08/04/2022	Ger Maguire	Roy Ryan
164598	47545	Ward & Burke Construction Ltd	8	KS201524 Ringsend Launder End Plate	101.56%	17	0.00%	0	80.62%	-2	E	31/05/2023	Ger Maguire	Roy Ryan
164598	47811	Ward & Burke Construction Ltd	1	SITE FIXING PACK - 164598 (Tank 3D)	100.06%	5	0.00%	0	33.33%	-2	E	15/05/2023	Ger Maguire	Roy Ryan
164598	47537	Ward & Burke Construction Ltd	2	KS201009 Launder Dropbox 4mt Section (Right)	100.00%	0	0.00%	0	41.67%	-11	E	15/05/2023	Ger Maguire	Roy Ryan
164598	47540	Ward & Burke Construction Ltd	2	KS231406 Launder Dropbox 4mt Section (Twin) Ringsend	100.00%	0	0.00%	0	199.96%	19	E	15/05/2023	Ger Maguire	Roy Ryan
164598	47532	Ward & Burke Construction Ltd	48	KS197587 STD Launder 3500mm Section (No Mounting Channel) Ringsend	100.00%	0	0.00%	0	78.43%	-90	A	15/05/2023	Ger Maguire	Roy Ryan
164598	47532	Ward & Burke Construction Ltd	48	KS197587 STD Launder 3500mm Section (No Mounting Channel) Ringsend	100.00%	0	0.00%	0	78.43%	-90	A	15/05/2023	Ger Maguire	Roy Ryan
164598	47532	Ward & Burke Construction Ltd	48	KS197587 STD Launder 3500mm Section (No Mounting Channel) Ringsend	100.00%	0	0.00%	0	78.43%	-90	A	31/05/2023	Ger Maguire	Roy Ryan
164598	47532	Ward & Burke Construction Ltd	48	KS197587 STD Launder 3500mm Section (No Mounting Channel) Ringsend	100.00%	0	0.00%	0	78.43%	-90	A	31/05/2023	Ger Maguire	Roy Ryan
164598	47532	Ward & Burke Construction Ltd	48	KS197587 STD Launder 3500mm Section (No Mounting Channel) Ringsend	100.00%	0	0.00%	0	78.43%	-90	A	31/05/2023	Ger Maguire	Roy Ryan
164598	47532	Ward & Burke Construction Ltd	48	KS197587 STD Launder 3500mm Section (No Mounting Channel) Ringsend	100.00%	0	0.00%	0	78.43%	-90	A	31/05/2023	Ger Maguire	Roy Ryan
164598	47532	Ward & Burke Construction Ltd	48	KS197587 STD Launder 3500mm Section (No Mounting Channel) Ringsend	100.00%	0	0.00%	0	78.43%	-90	A	31/05/2023	Ger Maguire	Roy Ryan
164598	47534	Ward & Burke Construction Ltd	8	KS280647 Launder 3500mm Section (W/ Tower Cross Bracing Assembly)	100.00%	0	0.00%	0	5.71%	-66	C	31/05/2023	Ger Maguire	Roy Ryan
164598	47539	Ward & Burke Construction Ltd	3	KS231361 Launder Dropbox 4mt Section (Left)	100.00%	0	0.00%	0	442.01%	97	D	15/05/2023	Ger Maguire	Roy Ryan
164598	45518	Ward & Burke Construction Ltd	32	KS248786 Ringsend Sludge Pipe Support	98.49%	-59	0.00%	0	86.61%	-11	C	31/05/2023	Ger Maguire	Roy Ryan
164598	47533	Ward & Burke Construction Ltd	16	KS242084 Launder 3500mm Section (W/ Std Cross Bracing Assembly)	98.39%	-1200	0.00%	0	116.04%	23	B	31/05/2023	Ger Maguire	Roy Ryan
164598	47533	Ward & Burke Construction Ltd	16	KS242084 Launder 3500mm Section (W/ Std Cross Bracing Assembly)	98.39%	-1200	0.00%	0	116.04%	23	B	31/05/2023	Ger Maguire	Roy Ryan
164598	47536	Ward & Burke Construction Ltd	8	KS201539 End Launder 3500mm Section (W/ Std Cross Bracing Assembly)	18.61%	-31658	0.00%	0	15.00%	-59	C	31/05/2023	Ger Maguire	Roy Ryan
164627	44397	Intel Ireland Ltd	1	GNT703 Pedestal - OPUS	0.00%	-12572	0.00%	0	0.00%	-202	B	16/09/2024	Ger Maguire	Orlaith Doyle
165099	48698	Intel Ireland Ltd	1	TRN1320 Pedestal - SS Plate	0.00%	-15799	0.00%	0	0.00%	-4	E	14/08/2023	Ger Maguire	Orlaith Doyle
165101	48700	Intel Ireland Ltd	1	TRN1420 Pedestal - SS Plate	0.00%	-15799	0.00%	0	0.00%	-4	E	16/08/2023	Ger Maguire	Orlaith Doyle
165384	43312	Intel Ireland Ltd	1	MME805 Pedestal - OPUS	4.02%	-12258	0.00%	0	1.09%	-227	B	24/12/2023	Ger Maguire	Mags Codd
165467	43073	Intel Ireland Ltd	1	GTA824 Pedestal - OPUS	2.45%	-10026	0.00%	0	7.03%	-149	B	06/12/2024	Ger Maguire	Darragh Kelly
165474	43118	Intel Ireland Ltd	1	VIM708 Pedestal - Opus	1.73%	-11125	0.00%	0	0.00%	-150	B	25/12/2023	Ger Maguire	Orlaith Doyle
165897	48224	Richmond Trading Co Ltd	1	AQUAOUS WASTE LIFT STATION - TK-9915B BOYANCY BRACKETS	104.14%	179	0.00%	0	135.23%	14	D	19/05/2023	Stephen Roche	Catherine Kinsella"

# Data for non-conformances by areas
areas = ['Engineering', 'Supplier', 'Fabrication', 'Inspection', 'No Area', 'Brake Press', 'Line Feed/Kitting']
non_conformances = [6, 2, 2, 3, 2, 1, 1]

# Create a pie chart
plt.pie(non_conformances, labels=areas, autopct='%1.1f%%')
plt.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle
plt.title('Non-Conformances by Areas')

# Display the chart
plt.show()