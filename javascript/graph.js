/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
PubMed Visualization
Creators: Patrick Tan, Pratyush Pati, Gary Chen

The PubMed Visualization applet is a graphical representation of the PubMed database of biomedical 
literature ranging from published journals and online books. The search criteria allows users 
to find articles based on titles, authors, and topics. The graph is rendered by the D3 JavaScript Library
which displays your search item in the middle and the authors and co-authors related to it by the connected
nodes. The size of the nodes varies depending how well the author or co-author is related with the searched 
item, such that closely related topics or authors and co-authors that often work together will appear larger.
Users can use a mouse-over to amplify the node and a double-click searches the selected item, while rendering 
a new graph. Additionally, a right-click allows user to Google search the name which will be displayed in a new
window or tab. Below the graph, the user is shown a data table consisting of titles, journal name, date of 
publication, and co-authors of the searched item. A single-click on the titles allows users to go directly to 
the article link on the PubMed website. The user is shown the first ten entries upon a search and has the 
option to browse additional entries by the numbered links below the data table. 

*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

LIST_AMOUNT = 10;
currentPage = 0;
currentBatch = 0;
totalCount = 0;
currentInc = LIST_AMOUNT * currentPage;
var coauthorArray = new Array();
var search_term = '';

(function(){
  $(document).ready(function(){
    window.onload = function(){
        $('#paginate').hide();
        document.getElementById("inputSearch").focus();
      };

    $("#searchButton").click(function() {
        currentBatch = 0;
        currentInc = 0;
        clearActive();
        search();
      });
    // Search feature.
    function search(){
      function coauthor(name, number)
      {
        this.name = name;
        this.number = number;
      }
      //api key:f6bc08acc6c7dbd33c60f04ac9d55f38
      //Search terms and parameters for entrezajax call
      search_term = $("#inputSearch").val();
        args = {'apikey' : 'f6bc08acc6c7dbd33c60f04ac9d55f38',
                'db'     : 'pubmed',
                'term'   : $("#inputSearch").val(),
                'retmax' : 100 + currentBatch * 100,          // maximum number of results from Esearch
                'max'    : 100 + currentBatch * 100,          // maximum number of results passed to Esummary
                'start'  : currentBatch * 100};
        //Check if call is successful
        $.getJSON('http://entrezajax.appspot.com/esearch+esummary?callback=?', args, function(data) {
          if(data.entrezajax.error == true) {
            $("#articles").html('<p>' + 'Sorry - EntrezAjax failed with error ' + data.entrezajax.error_message + '</p>');
            $('#paginate').hide();
            return;
          }

          //For loop adding all coauthors to array
          totalCount = data.entrezajax.count;
          coauthorArray.length = 0;
          $.each(data.result, function(i, item){
            for(var i = 0; i < item.AuthorList.length; i ++) {
              if(item.AuthorList[i].toLowerCase() != search_term.toLowerCase()){
                var authorListed = $.grep(coauthorArray, function(e){ return e.name == item.AuthorList[i]; })
                if(authorListed.length == 0)
                  coauthorArray.push(new coauthor(item.AuthorList[i],1));
                else if (authorListed.length == 1)
                  authorListed[0].number++;
              }
            }
          })

          changePagination();
          // Unbind active links to results of search.
          $('#p1').unbind('click');
          $('#p2').unbind('click');
          $('#p3').unbind('click');
          $('#p4').unbind('click');
          $('#p5').unbind('click');
          $('#p6').unbind('click');
          $('#p7').unbind('click');
          $('#p8').unbind('click');
          $('#p9').unbind('click');
          $('#p10').unbind('click');
          $('#prevBatch').unbind('click');
          $('#nextBatch').unbind('click');
          $('#p1').attr('class', 'active');

          showData(data, true);
          tree(data, coauthorArray);

          //Force page movement on pagination clicks
          $("#p1").click(function() {
            event.preventDefault();
            if(currentPage != 0){
              clearActive()
              $('#p1').attr('class', 'active');
              currentPage = 0;
              currentInc = LIST_AMOUNT * currentPage;
              showData(data, false);
              tree(data, coauthorArray);
            }
          });
          $("#p2").click(function() {
            event.preventDefault();
            if(currentPage != 1){
              clearActive()
              $('#p2').attr('class', 'active');
              currentPage = 1;
              currentInc = LIST_AMOUNT * currentPage;
              showData(data, false);
              tree(data, coauthorArray);
            }
          });
          $("#p3").click(function() {
            event.preventDefault();
            if(currentPage != 2){
              clearActive()
              $('#p3').attr('class', 'active');
              currentPage = 2;
              currentInc = LIST_AMOUNT * currentPage;
              showData(data, false);
              tree(data, coauthorArray);
            }
          });
          $("#p4").click(function() {
            event.preventDefault();
            if(currentPage != 3){
              clearActive()
              $('#p4').attr('class', 'active');
              currentPage = 3;
              currentInc = LIST_AMOUNT * currentPage;
              showData(data, false);
              tree(data, coauthorArray);
            }
          });
          $("#p5").click(function() {
            event.preventDefault();
            if(currentPage != 4){
              clearActive()
              $('#p5').attr('class', 'active');
              currentPage = 4;
              currentInc = LIST_AMOUNT * currentPage;
              showData(data, false);
              tree(data, coauthorArray);
            }
          });
          $("#p6").click(function() {
            event.preventDefault();
            if(currentPage != 5){
              clearActive()
              $('#p6').attr('class', 'active');
              currentPage = 5;
              currentInc = LIST_AMOUNT * currentPage;
              showData(data, false);
              tree(data, coauthorArray);
            }
          });
          $("#p7").click(function() {
            event.preventDefault();
            if(currentPage != 6){
              clearActive()
              $('#p7').attr('class', 'active');
              currentPage = 6;
              currentInc = LIST_AMOUNT * currentPage;
              showData(data, false);
              tree(data, coauthorArray);
            }
          });
          $("#p8").click(function() {
            event.preventDefault();
            if(currentPage != 7){
              clearActive()
              $('#p8').attr('class', 'active');
              currentPage = 7;
              currentInc = LIST_AMOUNT * currentPage;
              showData(data, false);
              tree(data, coauthorArray);
            }
          });
          $("#p9").click(function() {
            event.preventDefault();
            if(currentPage != 8){
              clearActive()
              $('#p9').attr('class', 'active');
              currentPage = 8;
              currentInc = LIST_AMOUNT * currentPage;
              showData(data, false);
              tree(data, coauthorArray);
            }
          });
          $("#p10").click(function() {
            event.preventDefault();
            if(currentPage != 9){
              clearActive()
              $('#p10').attr('class', 'active');
              currentPage = 9;
              currentInc = LIST_AMOUNT * currentPage;
              showData(data, false);
              tree(data, coauthorArray);
            }
          });
          $("#prevBatch").click(function() {
            event.preventDefault(); 
            if(currentBatch != 0){
              currentInc = 0;
              clearActive()
              currentBatch--;
              changePagination();
              search();
            } 
          });
          $("#nextBatch").click(function() {
            event.preventDefault();
            if(currentBatch * 100 <= totalCount){
              currentInc = 0;
              clearActive()
              currentBatch++;
              changePagination();
              search();
            }
          });
        });
    }
    // Display table of results.
    function showData(data, page){
      if(page){
        $('#paginate').show();
        var size = data.result.length;
        hider(size);
      }

      //Create table to show data of articles
      var tablecontents = "";
      tablecontents = '<table> <tr> <th>Title</th> <th>Journal</th><th>Date</th><th>Coauthors</th> </tr>';
      var item = data.result;
      //Create list of authors for each article
      for (var num = 0; num < LIST_AMOUNT && (currentBatch * 100 + currentInc + num) < totalCount; num ++)
      {
        var author_list = '';
        for(var i = 0; i < item[currentInc + num].AuthorList.length; i ++) {
          if(i != 0) {
            author_list += ', ';
          }
          author_list += item[currentInc + num].AuthorList[i];
        }
        if(num % 2 == 0)
          tablecontents += "<tr>";
        else
          tablecontents += "<tr class='alt'>";
        tablecontents += "<td>" + '<a href=\'http://www.ncbi.nlm.nih.gov/pubmed/' + item[currentInc + num].ArticleIds.pubmed + '\'>' + item[currentInc + num].Title + '</a>' + "</td>";
        tablecontents += "<td>" + item[currentInc + num].FullJournalName + "</td>";
        tablecontents += "<td>" + item[currentInc + num].PubDate + "</td>";
        tablecontents += "<td>" + author_list + "</td>";
        tablecontents += "</tr>";
      }
      tablecontents += "</table>";
      
      document.getElementById("articles").innerHTML = tablecontents;
    }

    //Hides pagination numbers if over the limit
    function hider(size){
      if(size <= 90)
        $('#p10').hide();
      else
        $('#p10').show();
      if(size <= 80)
        $('#p9').hide();
      else
        $('#p9').show();
      if(size <= 70)
        $('#p8').hide();
      else
        $('#p8').show();
      if(size <= 60)
        $('#p7').hide();
      else
        $('#p7').show();
      if(size <= 50)
        $('#p6').hide();
      else
        $('#p6').show();
      if(size <= 40)
        $('#p5').hide();
      else
        $('#p5').show();
      if(size <= 30)
        $('#p4').hide();
      else
        $('#p4').show();
      if(size <= 20)
        $('#p3').hide();
      else
        $('#p3').show();
      if(size <= 10)
        $('#p2').hide();
      else
        $('#p2').show();
      if(currentBatch == 0)
        $('#prevBatch').attr('class', 'disabled');
      else
        $('#prevBatch').attr('class', '');
      if((currentBatch + 1) * 100 > totalCount)
        $('#nextBatch').attr('class', 'disabled');
      else
        $('#nextBatch').attr('class', '');
    }

    function clearActive(){
      $('#p1').attr('class', '');
      $('#p2').attr('class', '');
      $('#p3').attr('class', '');
      $('#p4').attr('class', '');
      $('#p5').attr('class', '');
      $('#p6').attr('class', '');
      $('#p7').attr('class', '');
      $('#p8').attr('class', '');
      $('#p9').attr('class', '');
      $('#p10').attr('class', '');
    }

    function changePagination(){
      document.getElementById("page1").innerHTML = 1 + 10 * currentBatch;
      document.getElementById("page2").innerHTML = 2 + 10 * currentBatch;
      document.getElementById("page3").innerHTML = 3 + 10 * currentBatch;
      document.getElementById("page4").innerHTML = 4 + 10 * currentBatch;
      document.getElementById("page5").innerHTML = 5 + 10 * currentBatch;
      document.getElementById("page6").innerHTML = 6 + 10 * currentBatch;
      document.getElementById("page7").innerHTML = 7 + 10 * currentBatch;
      document.getElementById("page8").innerHTML = 8 + 10 * currentBatch;
      document.getElementById("page9").innerHTML = 9 + 10 * currentBatch;
      document.getElementById("page10").innerHTML = 10 + 10 * currentBatch;
    }

    function tree(data, coauthorArray){
      $(window).resize(function() {
        waitForFinalEvent(function() {
          removeGraph();
          tree(data, coauthorArray);
        }, 500, '0a1edaaa-3f4e-4a23-8bc2-7f6e1a5f35b1');
      });

      var removeGraph = function() {
        svg = d3.select('#chart svg');
        svg.on('click', null);
        svg.on('dblclick', null);
        svg.on('mouseover', null);
        svg.on('mouseout', null);

        $('#chart').empty();
      }

      removeGraph();
      // Obtain data set of co-authors.
      var dataSet = makeDataSet();
      function makeDataSet(){
        var included = new Array();
        var first = true;
        var dataSet='';
        dataSet += '{"name": "' + search_term + '", "size": 100000';
        if(data.result.length != 0)
        {
          dataSet += ',"children": [';
          //For each article
          for(var num = 0; (num < LIST_AMOUNT) && (currentBatch * 100 + currentInc + num) < totalCount; num++)
          {
            //Find number of times author has worked with each coauthor
            for(var i = 0; i < data.result[currentInc +  num].AuthorList.length; i++) {
              if(data.result[currentInc + num].AuthorList[i].toLowerCase() != search_term.toLowerCase()){
                var checkAuthor = $.grep(included, function(e){ return e.name == data.result[currentInc + num].AuthorList[i]; })
                if(checkAuthor.length == 0){
                  var authorListed = $.grep(coauthorArray, function(e){ return e.name == data.result[currentInc + num].AuthorList[i]; })
                  included.push(authorListed[0]);
                  if(first){
                    dataSet += '{"name": "' + data.result[currentInc + num].AuthorList[i] + '", "size": ' + authorListed[0].number * 3000 + '}';
                    first = false;
                  }
                  else
                    dataSet += ',{"name": "' + data.result[currentInc + num].AuthorList[i] + '", "size": ' + authorListed[0].number * 3000 + '}';
                }
              }
            }
          }
          dataSet += ']';
        }
        dataSet += '}';
        return dataSet;
      }
      
      // Size of window graph is present.
      var w = $("#chart").width(),
          h = $("#chart").height(),
          root;

      var force = d3.layout.force()
          .linkDistance(150)
          .charge(-600)
          .gravity(.05)
          .size([w, h]);

      var vis = d3.select("#chart").append("svg:svg")
          .attr("width", w)
          .attr("height", h)

      var json = jQuery.parseJSON(dataSet);
        root = json;
        update();

      function update() {
        var nodes = flatten(root),
            links = d3.layout.tree().links(nodes);

        // Restart the force layout.
        force
            .nodes(nodes)
            .links(links)
            .start();

        // Update the links…
        var link = vis.selectAll("line.link")
            .data(links, function(d) { return d.target.id; });

        // Enter any new links.
        link.enter().insert("svg:line", ".node")
            .attr("class", "link")
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        // Exit any old links.
        link.exit().remove();

        // Update the nodes…
        var node = vis.selectAll("g.node")
            .data(nodes, function(d) { return d.id; })

        node.select("circle")
            .style("fill", color);

        // Enter any new nodes.
        var nodeEnter = node.enter().append("svg:g")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
            .on("click", click)
            .on("contextmenu", rightclick)
            .on("dblclick", dblclick)
            .on("contextmenu", rightclick)
            .on("mouseover",mouseover)
            .on("mouseout",mouseout)
            .call(force.drag);
            // Circle characteristics
        nodeEnter.append("svg:circle")
            .attr("r", function(d) { return Math.sqrt(d.size) / 10 || 4.5; })
            .attr("original", function(d) { return Math.sqrt(d.size) / 10 || 4.5; })
            .attr("store", function(d) { return 3 * Math.sqrt(d.size) / 10 || 4.5; })
            .style("fill", color);
            // Text characteristics
        nodeEnter.append("svg:text")
            .attr("text-anchor", "middle")
            .attr("dy", ".35em")
            .text(function(d) { return d.name; });

        // Exit any old nodes.
        node.exit().remove();

        // Re-select for update.
        link = vis.selectAll("line.link");
        node = vis.selectAll("g.node");

        force.on("tick", function() {
          link.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });

          node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        });
      }

      // Color of the Nodes.
      function color(d) {
        return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#95d2ca";
      }

      // Toggle children on click.
      function click(d) {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
        update();
      }
      // Double Click Feature: Focus of the graph. 
      function dblclick(d) {
        currentBatch = 0;
        currentInc = 0;
        clearActive();
        $("#inputSearch").val(d.name);
        search();
      }
      // Right Click Feature: Link to author.
      function rightclick(d) {
        var txt = encodeURIComponent(d.name);
        window.open("https://www.google.com/#q=" + txt);
        // win.focus();
      }

      function rightclick(d) {
        var txt = encodeURIComponent(d.name);
        window.open("https://www.google.com/#q=" + txt);
        // win.focus();
      }


      // Returns a list of all nodes under the root.
      function flatten(root) {
        var nodes = [], i = 0;

        function recurse(node) {
          if (node.children) node.children.forEach(recurse);
          if (!node.id) node.id = ++i;
          nodes.push(node);
        }

        recurse(root);
        return nodes;
      }
      //When mouse inside the node.
      function mouseover(d) {
        var newSize = d3.select(this).select("circle").attr("store");
        d3.select(this).select("circle").transition()
            .duration(500)
            .attr("r", newSize)
            d3.select(this.parentNode.appendChild(this));
        d3.select(this).select("text").transition()
            .duration(500)
            .style("font-size", "30px")
      }
      // When mouse outside the node.
      function mouseout(d) {
        var newSize = d3.select(this).select("circle").attr("original");
        d3.select(this).select("circle").transition()
            .duration(500)
            .attr("r", newSize);
        d3.select(this).select("text").transition()
            .duration(500)
            .style("font-size", "10px")
      }

    }
    // Run-time Check.
    var waitForFinalEvent = (function () {
          var timers = {};
          return function (callback, ms, uniqueId) {
              if (!uniqueId) {
                  uniqueId = 'Don\'t call this twice without a uniqueId';
              }
              if (timers[uniqueId]) {
                  clearTimeout (timers[uniqueId]);
              }
              timers[uniqueId] = setTimeout(callback, ms);
          };
      })()

  }); //document ready
})();
