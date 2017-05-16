(function() {
    var margin = { top:0, left: 0, right: 0, bottom: 0}
    height = 400 - margin.top - margin.bottom
    width = 800 - margin.left - margin.right

    var svg = d3.select("#map")
                .append("svg")
                .attr("height", height + margin.top + margin.bottom)
                .attr("width", width + margin.left + margin.right)
                .append("g")  // g element s used to group SVG shapes together
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")  //?

    d3.queue()
        .defer(d3.json, "us.topo.json")
        .defer(d3.json, "usa_zip_map.json")
        .defer(d3.csv, "college_data.csv")
        .await(ready)

var color_domain = [50, 150, 350, 750, 1500]
  var ext_color_domain = [0, 50, 150, 350, 750, 1500]
  var legend_labels = ["< 50", "50+", "150+", "350+", "750+", "> 1500"]
  var color = d3.scaleThreshold()
  .domain(color_domain)
  .range(["#adfcad", "#ffcb40", "#ffba00", "#ff7d73", "#ff4e40", "#ff1300"]);


    // projection is for taking something like the world, which is in a sphere, and fitting it intp a flat screen
    var projection = d3.geoAlbersUsa()
                        .translate([width / 2, height / 2])
                        .scale(850)

    // takes projection and draws shape, allowing it to take latitude and longitude
    var path = d3.geoPath()
                .projection(projection)

    function ready (error, data, zips, college_data) {

        var popById = {}
        var zipById = {}

        college_data.forEach(function(d) {
            popById[d.zipcode]= +d.size
            // zipById[id] = d.zipcode
        })

        var zipcodes = topojson.feature(zips, zips.objects.zip_codes_for_the_usa).features
        console.log(college_data)
        console.log(zipcodes)

        svg.selectAll(".zipcode")
        .data(zipcodes)
        .enter().append("path")
        .attr("class", "zipcode")
        .attr("d", path)
        .style("fill", function(d) {
            return color(popById[d.properties.zip]);
          })
          .style("opacity", 0.8)


        // svg.selectAll(".county")
        // .data(counties)
        // .enter().append("path")
        // .attr("class", "county")
        // .attr("d", path)
        /*
        topojson.feature converts raw geodata into useable geodata
        Always pass the data, then data.objectes.__something__ then get .features out of it
        */
        var states = topojson.feature(data, data.objects.state).features

        // add paths for each state
        svg.selectAll(".state")
            .data(states)
            .enter().append("path")
            .attr("class", "state")
            .attr('d', path)

        // svg.selectAll('.college')
        //     .data(college_data)
        //     .enter().append("circle")
        //     .attr('class', 'college')
        //     .attr("r", 2)
        //     .attr("cx", function (d) {
        //         var coords = projection([d.long, d.lat])
        //         if (coords) {
        //             return coords[0]
        //         }
        //     })
        //     .attr("cy", function (d) {
        //         var coords = projection([d.long, d.lat])
        //         if (coords) {
        //            return coords[1]
        //     }
        //     })

    }

})();

// Questions
    // 1. what does ender and path do?
