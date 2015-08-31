function convertToD3Format(rankingWithResultObj) {
  // d.order, d.attributeKey, d.attributeRank,
  var attributeKeyValueToRank = {};
  var domainKeys = [];
  var data = [];

  var domains = rankingWithResultObj.Domains;
  for (var d = 0; d < domains.length; ++d) {
    var domain = domains[d];
    var domainName = domain.Name;
    domainKeys.push(rankingWithResultObj.Attributes.indexOf(domainName));
    var tags = domain.Tags;
    for (var rankString in tags) {
      var tag = tags[rankString];
      var rankInt = parseInt(rankString[4]);
      for (var i = 0; i < tag.length; ++i) {
        var rankItem = tag[i];
        var attributeValue = rankItem.Name;
        attributeKeyValueToRank[domainName + attributeValue] = rankInt;
      }
    }
  }

  var results = rankingWithResultObj.Results;
  for (var i = 0; i<results.length; ++i) {
    var result = results[i];
    var attributes = result.Attributes;
    for (var k =0; k<domainKeys.length; ++k) {
      var a = domainKeys[k];
      var attribute = attributes[a];
      var row = {}
      row.order = i;
      row.attributeKey = k;
      row.attributeRank = attributeKeyValueToRank[rankingWithResultObj.Attributes[a] + attribute];
      data.push(row)
    }
  }
  return data;
}

function plotScatter(rankingWithResultObj, newWindowBody) {
  var data = convertToD3Format(rankingWithResultObj);
  var domains = rankingWithResultObj.Domains;

  var margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 40
    },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var x = d3.scale.linear()
    .range([0, width]);

  var y = d3.scale.linear()
    .range([height, 0]);

  var color = d3.scale.category20c();

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  var svg = newWindowBody.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  data.forEach(function(d) {
    d.attributeKey = +d.attributeKey;
    d.order = +d.order;

    // Find domain for doing a mapping later.
    x.domain(d3.extent(data, function(d) {
      return d.attributeKey;
    })).nice();
    y.domain(d3.extent(data, function(d) {
      return d.order;
    })).nice();

    // Create x-axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      // label
      .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Attributes");

    // Create y-axis
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      // label
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Ranking")

    // Start plotting
/*    svg.selectAll(".dot")
      .data(data)
      // attribute of each circle
      .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      // where should the  center be?
      .attr("cx", function(d) {
        return x(d.attributeKey);
      })
      .attr("cy", function(d) {
        return y(d.order);
      })
      .style("fill", function(d) {
        return color(d.attributeRank);
      });*/
    svg.selectAll(".dot")
      .data(data)
      .enter().append("rect")
      .attr("class", "dot")
      .attr("width",20)
      .attr("height",3.5)
      .attr("x", function(d) {
        return x(d.attributeKey);
      })
      .attr("y", function(d) {
        return y(d.order);
      })
      .style("fill", function(d) {
        return color(d.attributeRank);
      });


    var legend = svg.selectAll(".legend")
      .data(color.domain())
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) {
        return "translate(0," + i * 20 + ")";
      });

    legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

    legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) {
        return d;
      });
  });
}