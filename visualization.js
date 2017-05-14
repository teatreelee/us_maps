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
        .await(ready)


    // projection is for taking something like the world, which is in a sphere, and fitting it intp a flat screen
    var projection = d3.geoAlbersUsa()
                        .translate([width / 2, height / 2])
                        .scale(850)

    // takes projection and draws shape, allowing it to take latitude and longitude
    var path = d3.geoPath()
                .projection(projection)

    function ready (error, data, zips) {
        // console.log(zips)

        var zipcodes = topojson.feature(zips, zips.objects.zip_codes_for_the_usa).features
        console.log(zipcodes)

        svg.selectAll(".county")
        .data(zipcodes)
        .enter().append("path")
        .attr("class", "county")
        .attr("d", path)


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
        console.log(states)

        // add paths for each state
        svg.selectAll(".state")
            .data(states)
            .enter().append("path")
            .attr("class", "state")
            .attr('d', path)
    }

})();

// Questions
    // 1. what does ender and path do?
