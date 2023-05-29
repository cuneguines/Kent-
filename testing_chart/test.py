import matplotlib.pyplot as plt

# Data for non-conformances by areas
areas = ['Engineering', 'Supplier', 'Fabrication', 'Inspection', 'No Area', 'Brake Press', 'Line Feed/Kitting']
non_conformances = [6, 2, 2, 3, 2, 1, 1]

# Create a pie chart
plt.pie(non_conformances, labels=areas, autopct='%1.1f%%')
plt.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle
plt.title('Non-Conformances by Areas')

# Display the chart
plt.show()