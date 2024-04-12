# belly-button-challenge

Below are the steps taken to build the visualizations and the rationale behind each function approach:

**1. Initialization and Data Retrieval:**
   - `init()`: This function initializes the dashboard by populating the dropdown menu with sample IDs and displaying the default sample's metadata and charts. It fetches the data from the provided JSON file using D3's `d3.json()` method and then proceeds to build the dropdown menu and display initial data.

**2. Building Metadata Display:**
   - `buildMetadata(sample)`: This function builds and updates the metadata display for the selected sample. It retrieves the metadata from the JSON data based on the selected sample ID and appends key-value pairs to the designated HTML element. This approach fulfills the requirement to display an individual's demographic information.

**3. Creating Horizontal Bar Chart:**
   - `buildCharts(sample)`: This function creates and updates the horizontal bar chart displaying the top 10 OTUs found in the selected sample. It extracts the required data from the JSON, including OTU IDs, sample values, and labels, and then uses Plotly to generate the horizontal bar chart. The chart is interactive and provides hovertext with OTU labels. This approach meets the requirement to display the top 10 OTUs in a dropdown menu with sample values, OTU IDs, and hovertext for the chart.

**4. Generating Bubble Chart:**
   - `buildCharts(sample)`: Within the same function as the horizontal bar chart, this function also generates a bubble chart to visualize each sample. It utilizes the OTU IDs for x-values, sample values for y-values, sample values for marker size, OTU IDs for marker colors, and OTU labels for text values. This approach offers a comprehensive view of the sample data, providing insights into the distribution and abundance of OTUs.

**5. Updating Plots on Selection Change:**
   - `optionChanged(newSample)`: This function is triggered when a new sample is selected from the dropdown menu. It updates both the metadata display and the charts with the data corresponding to the newly selected sample. This ensures that the visualizations dynamically reflect the user's selection, allowing for interactive exploration of the dataset.

This took a lot of googling, stackoverflow, and erroring to figure out how to structure it like this. 