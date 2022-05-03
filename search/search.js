$(document).ready(function(){
    if (window.XMLHttpRequest)
      {// code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp=new XMLHttpRequest();
      }
    else
      {// code for IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
      }
    
    //http://www.nobelcom.com/eshop/misc/affiliateProductFeed.htm?from=1
    //http://images.nobelglobe.com/affiliates_banners/nobelcom-from-USA.xml
    
    xmlhttp.open("GET","/search/av.xml",false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML; 
    
    x=xmlDoc.getElementsByTagName("product");
    
    $(function(){
    var products = [];
    var fields = [];
    
    for (i=0;i<x.length;i++) { 
    
    //price=(x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue*100).toFixed(2);
    
     fields[0] = (x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue);
     //fields[1] = ('  from <span class="price">' + price + '</span>  &cent; / minute');
    
    products.push(fields[0]);
    
    
                            }  
        
    
      // functie autocomplete
      /*$('#autocomplete').autocomplete({
    
        lookup: products, 
        onSelect: function (suggestion) {
            var container = $('<div />');
    for (i=0;i<x.length;i++)
            { 
            // if (suggestion.value == x[i].getElementsByTagName("calling_to")[0].childNodes[0].nodeValue )
            // if (suggestion.value.toLowerCase().indexOf(x[i].getElementsByTagName("calling_to")[0].childNodes[0].nodeValue) >= 0)
            var count=0;
             if (x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue.includes(suggestion.value))
             { count++;
        
    product=(x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue);
    description=(x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue);
    url=(x[i].getElementsByTagName("url")[0].childNodes[0].nodeValue);
    img=(x[i].getElementsByTagName("imageurl")[0].childNodes[0].nodeValue);
    price=(x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue);
    store=(x[i].getElementsByTagName("manufacturer")[0].childNodes[0].nodeValue);
    sku=(x[i].getElementsByTagName("sku")[0].childNodes[0].nodeValue);    
    
    
    
    container.append('<div class="result"><a href="'+'http://'+ url+'" target="_blank"><strong>' + product + '</strong></a>' + '<div>' + description + '</div><br>' +'From <span class="price">' + price +'</span> &cent; / minute <a class="buyNowButton" href="'+'http://'+ url+'"> Go to site </a></div>');
     $('#outputcontent').html(container);
        
    }
    }
    
            }
      }); */
      
    
    
    //start function 2
    //$('#search').submit(function() {
        
        $('#search').on("input submit", function() {
        // get all the inputs into an array.
        
      
        var container = $('<div />');
    
    for (i=0;i<x.length;i++)
            { 
            // if (suggestion.value == x[i].getElementsByTagName("calling_to")[0].childNodes[0].nodeValue )
            // if (suggestion.value.toLowerCase().indexOf(x[i].getElementsByTagName("calling_to")[0].childNodes[0].nodeValue) >= 0)
            
                var input= $("#autocomplete").val().toLowerCase();
                var name = x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue.toLowerCase();
                
             if (input.length >= 4) {
                
                   if (name.includes(input)) { 
                   var results=1;
                   
        
    product=(x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue);
    description=(x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue);
    license=(x[i].getElementsByTagName("license")[0].childNodes[0].nodeValue);
    url=(x[i].getElementsByTagName("url")[0].childNodes[0].nodeValue);
    img=(x[i].getElementsByTagName("imageurl")[0].childNodes[0].nodeValue);
    fullprice=(x[i].getElementsByTagName("fullprice")[0].childNodes[0].nodeValue);
    price=(x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue);
    discount=(x[i].getElementsByTagName("discount")[0].childNodes[0].nodeValue);
    currency=(x[i].getElementsByTagName("currency")[0].childNodes[0].nodeValue);
    brand=(x[i].getElementsByTagName("manufacturer")[0].childNodes[0].nodeValue);
    sku=(x[i].getElementsByTagName("sku")[0].childNodes[0].nodeValue);    
    
    
    
    container.append('<div class="offer"><div class="offer-brand"><div class="offer-box2"><img src="' + img + '"/></div>' + '<div class="offer-desc"><strong>' + product+'</strong><br>'+ description + '</div></div><div class="offer-disc">Discount</br><strong>' + discount +'</strong></div><div class="offer-more"><span class="price-old">'+ currency + ' ' + fullprice+'</span><strong>'+ currency + ' ' + price +'</strong><br>' + license + '<a class="mainbtn" onclick="window.open(\'http://'+ url + '\');ga(\'send\',\'event\',\'Search\',\'' + brand + '\',\''+ product +'\')\"> Buy Now </a></div></div>');
     
         
             }
            //else {var results=0;}
            }
            
            }
            console.log(results);  
            if (input.length >= 4 & results== null) { container.append('<strong style="color:#fff;">No results</straong>');}
            $('#outputcontent').html(container);
        return false;
         });   
        //end function 2
    });
    
    
    });