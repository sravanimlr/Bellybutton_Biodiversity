function init() {
  data = [{
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16] }];
  Plotly.newPlot("bubble", data);
};

d3.selectAll("#dropdownMenu").on("change", updatePlotly);
function updatePlotly() {
  var dropdownMenu = d3.select("#dropdownMenu");
  var dataset = dropdownMenu.property("value");

  var xData = [1, 2, 3, 4, 5];
  var yData = [];

  if (dataset === 'dataset1') {
    yData = [1, 2, 4, 8, 16];
  };

  if (dataset === 'dataset2') {
    yData = [1, 10, 100, 1000, 10000];
  };

  var trace = {
    x: [xData],
    y: [yData],
  };
  Plotly.restyle("bubble", trace);
};

init();

function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
})}

init();

function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
  buildBubble(newSample);
}

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");


    Object.entries(result).forEach(([key, value]) => {

      metadata = metadata.filter(row => row[key] === value);
    });
    //Javascript syntax for .text function 
    PANEL.html("");  
      Object.entries(result).forEach(function([filtering,value]){
        PANEL.append("h6").text(`${filtering}: ${value}`);});

    // PANEL.append("h6").text(result.id).property("id", result);
    // PANEL.append("h6").text(result.ethnicity);
    // PANEL.append("h6").text(result.age);
    // PANEL.append("h6").text(result.location);
    // PANEL.append("h6").text(result.bbtype);
    // PANEL.append("h6").text(result.wfreq);
  });
}

//Create a bar chart of the top ten bacterial species in a volunteer’s navel. Use JavaScript to select only the most populous species.
function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var sampleArray = samples.filter(sampleObj => sampleObj.id == sample);
    //id from the drop down
    sampleResult = sampleArray[0];

    Object.entries(sampleResult).forEach(([key, value]) => {

      samples = samples.filter(row => row[key] === value);

    //fetches the data from the samples dataset 
    var sampleIds = sampleResult.otu_ids;
    var sampleOtu = sampleResult.otu_labels;
    var sampleValues = sampleResult.sample_values;
    
    console.log(sampleIds);
    console.log(sampleOtu);
    console.log(sampleValues);
    console.log(topSample);
    
    //slicing for top 10 
    var topSample = sampleValues.slice(0,10);
    var topIds = sampleIds.slice(0,10).map(id => "OTU"+id.toString());
    var topOtu = sampleOtu.slice(0,10);
    
    
    var trace = {
      x: topSample,
      y: topIds,
      text: topOtu,
      orientation: 'h',
      type: "bar"
    };
    var sampledata = [trace];
    var layout = {
      title: "Top Ten Bacterial Species per ID",
    };
    Plotly.newPlot("bar", sampledata, layout);
  });

});}
  //d3.selectAll("#sample-metadata").on("change", buildCharts);
    // Use otu_ids for the x-axis values.
    // Use sample_values for the y-axis values.
    // Use sample_values for the marker size.
    // Use otu_ids for the marker colors.
    // Use otu_labels for the text values.

function buildBubble(sample) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var sampleArray = samples.filter(sampleObj => sampleObj.id == sample);
    //id from the drop down
    sampleResult = sampleArray[0];
    //fetches the data from the samples dataset 
    var bubbleIds = sampleResult.otu_ids;
    var bubbleOtu = sampleResult.otu_labels;
    var bubbleValues = sampleResult.sample_values;

    var trace1 = {
      x: bubbleIds,
      y: bubbleValues,
      text: bubbleOtu,
      mode: "markers",
        marker: {
          color: bubbleIds,
          size: bubbleValues,
          colorScale: "earth"}};
    
    var bubbledata = [trace1];
    
    var layout = {
       title: 'Distrubution of Bellybutton Bacteria',
       //showlegend: false,
       //height: 600,
       //width: 600
     };
    
     Plotly.newPlot("bubble", bubbledata, layout);

});}

