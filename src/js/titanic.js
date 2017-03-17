var Titanic = function(name) {
   var anim;
   var state = 0;

   function start() {
       if (state % 2 == 0) {
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
        
        // Feel free to handle any other events here, not just click or hover
        document.getElementById('icons8-'+name).addEventListener("click", start);
        document.getElementById('icons8-'+name).addEventListener("pointerenter", start);
        document.getElementById('icons8-'+name).addEventListener("pointerleave", start);
        

        anim = bodymovin.loadAnimation({
            container: document.getElementById('icons8-'+name),
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: 'icons/'+name+'.json'
        }); 

    });
};