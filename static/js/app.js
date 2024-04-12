// Function to initialize the dashboard
function init() {
    // Select dropdown menu
    var dropdown = d3.select("#selDataset");

    // Read the data
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
        // Get the names
        var names = data.names;

        // Append the options to the dropdown menu
        names.forEach((name) => {
            dropdown.append("option").text(name).property("value", name);
        });

        // Call the functions to display the data and plots
        buildMetadata(names[0]);
        buildCharts(names[0]);
    });
}

// Function to build metadata
function buildMetadata(sample) {
    // Read the data
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
        // Select the metadata div
        var metadata = d3.select("#sample-metadata");

        // Clear the existing metadata
        metadata.html("");

        // Get the metadata info
        var metadataInfo = data.metadata.filter((obj) => obj.id == sample)[0];

        // Append the metadata info to the div
        Object.entries(metadataInfo).forEach(([key, value]) => {
            metadata.append("p").text(`${key}: ${value}`);
        });
    });
}

// Function to build charts
function buildCharts(sample) {
    // Read the data
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
        // Get the sample data
        var sampleData = data.samples.filter((obj) => obj.id == sample)[0];

        // Get top 10 OTUs
        var otu_ids = sampleData.otu_ids.slice(0, 10).map((id) => `OTU ${id}`).reverse();
        var sample_values = sampleData.sample_values.slice(0, 10).reverse();
        var otu_labels = sampleData.otu_labels.slice(0, 10).reverse();

        // Build bar chart
        var trace1 = {
            x: sample_values,
            y: otu_ids,
            text: otu_labels,
            type: "bar",
            orientation: "h"
        };
        var data1 = [trace1];
        var layout1 = {
            title: "Top 10 OTUs",
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU ID" }
        };
        Plotly.newPlot("bar", data1, layout1);

        // Build bubble chart
        var trace2 = {
            x: sampleData.otu_ids,
            y: sampleData.sample_values,
            mode: 'markers',
            marker: {
                size: sampleData.sample_values,
                color: sampleData.otu_ids,
                colorscale: 'Earth'
            },
            text: sampleData.otu_labels
        };
        var data2 = [trace2];
        var layout2 = {
            title: "OTU Sample",
            xaxis: { title: "OTU ID" },
            yaxis: { title: "Sample Values" }
        };
        Plotly.newPlot("bubble", data2, layout2);
    });
}

// Function to update plots
function optionChanged(newSample) {
    // Update metadata
    buildMetadata(newSample);
    // Update charts
    buildCharts(newSample);
}

// Initialize the dashboard
init();
