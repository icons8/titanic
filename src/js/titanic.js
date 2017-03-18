var Titanic = function(name, baseURL) {
   var anim;
   var state = 0;

   function start() {
       if (state % 2 === 0) {
           // All animations have 28 frames:
           // - First 14 ones for changing the satate
           // - And the next 14 back to return to the original state
           anim.playSegments([0, 13], true);
       } else {
           anim.playSegments([14, 27], true);
       }
       state++;
   }

    document.addEventListener("DOMContentLoaded", function() {
        
        var d = document.getElementById(name);
        // Feel free to handle any other events here, not just click or hover
        d.addEventListener("click", start);
        d.addEventListener("pointerenter", start);
        d.addEventListener("pointerleave", start);
        

        anim = bodymovin.loadAnimation({
            container: d,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: baseURL+name+'.json'
        }); 

    });
};

// Initialization
var titanic = function() {
    
    function begin(baseURL) {
    if(typeof baseURL == 'undefined') {
        baseURL = 'https://cdn.rawgit.com/icons8/titanic/master/dist/icons/';
    }
    var divs = document.getElementsByClassName('titanic');
    var icons = [];
    var iconID;
    var i = divs.length;
    while(i) {
        i--;
        iconID = divs[i].id;
        icons[i] = new Titanic(iconID, baseURL);
        }
    }
    return  {
        begin: begin
    };

}();
