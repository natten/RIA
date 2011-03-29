/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 * @param canvas_composite {object} Resultat
 * @param canvas_texture {object} Textur
 * @param canvas_normalmap {object} Normal map
 * @param light_x {float} X-pos för ljuskälla
 * @param light_y {float} Y-pos för ljuskälla
 * @param light_z {float} Z-pos för ljuskälla
 */
function bump(canvas_composite, canvas_texture, canvas_normalmap, light_x, light_y, light_z) {
    //var c_attenuation = 2;
    var image = canvas_texture.getContext('2d').getImageData(0, 0, canvas_texture.width, canvas_texture.height);
    var pixeldata = image.data;
    
    //Hämta normaler
    var n = 0;
    var p = 0;
    var normals = getNormals(canvas_normalmap);

    for(var x = 0; x < canvas_texture.width; x++) {
        for(var y = 0; y < canvas_texture.height; y++) {
            //Beräkna riktningen till ljuskällan.
            var direction_x = light_x - x;
            var direction_y = light_y - y
            var direction_z = light_z;

            //Plocka ut normalerna ur arrayn
            var normal_x = normals[n];
            var normal_y = normals[n + 1];
            var normal_z = normals[n + 2];

            //Normalisera vektor
            var abslength = Math.sqrt((direction_x * direction_x) + (direction_y * direction_y) + (direction_z * direction_z));
            direction_x = direction_x/abslength;
            direction_y = direction_y/abslength;
            direction_z = direction_z/abslength;
            
            //Beräkna dotprodukt
            var c_x = normal_x * direction_x;
            var c_y = normal_y * direction_y;
            var c_z = normal_z * direction_z;
            var dot = c_x + c_y + c_z;

            //Ett försök till phong shading enligt http://www.opengl.org/sdk/docs/tutorials/ClockworkCoders/lighting.php
            var c_ambient = 0.01;
            var shininess = 10;
            //Sätt slutgiltig färg för pixel. Sker per kanal exklusive alphakanal
            for(var c = 0; c < 3; c++) {
                var c_diffuse = clamp(pixeldata[p + c] * Math.max(dot, 0.0), 0, 255);
                var c_specular = clamp(pixeldata[p + c] * Math.pow(Math.max(dot, 0,0), 0.3 * shininess), 0, 255);
                var c_final = c_ambient + c_diffuse + c_specular;

                pixeldata[p + c] = clamp(c_final, 0, 255)
                
            }
            p += 4; //4 kanaler per pixel i texturen, RGBA
            n += 3; //3 kanaler per pixel i normalmap, TBN
        }
    }
    //Rendera färdig bild
    canvas_composite.getContext('2d').putImageData(image, 0, 0);
}

/**
 * Ser till att vi inte över/understiger maximalt färgvärde. 0 - 255 i detta fall
 * 
 */
function clamp(value, min, max) {
    if(value > max)
        return max;
    if(value < min)
        return min;
    return value;
}

/**
 * Hämtar normaler från normalmap
 * @param {object} Canvas innehållande normalmap
 * @return {array} Normals
 */
function getNormals(canvas) {
    var normals = [];
    
    //Hämta pixeldata från normalmap.
    //Ligger lagrade som RGBA flyttal i en array
    //Totalt Width*Height*Channels index

    var pixeldata = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;

    //Gå igenom arrayn med pixeldatan. 
    for(var i = 0; i < canvas.width * canvas.height * 4; i += 4) {

        //Hämtar normaler från färgkanaler
        //Red
        var normal_x = pixeldata[i];
        //Green
        var normal_y = pixeldata[i + 1];
        //Blue
        var normal_z = pixeldata[i + 2];
        //Alpha använder vi ej

        //Normalisera vektor
        var abslength = Math.sqrt((normal_x * normal_x) + (normal_y * normal_y) + (normal_z * normal_z));
        normal_x = normal_x/abslength;
        normal_y = normal_y/abslength;
        normal_z = normal_z/abslength;
        
        //Lägg in dem i våran array
        normals.push(normal_x);
        normals.push(normal_y);
        normals.push(normal_z);
    }

    return normals;
}


function shader_example() {

    //Ladda i serie så vi vet att allt är fördigladdat innan vi börjar
    
    //Normalmap
    var ctx_normals = document.getElementById("canvas_normalmap").getContext('2d');
    var img_normals = new Image();
    img_normals.onload = function() {
        ctx_normals.drawImage(img_normals, 0, 0);

        //Textur
        var ctx_texture = document.getElementById("canvas_texture").getContext('2d');
        var img_texture = new Image();
        img_texture.onload = function() {
            ctx_texture.drawImage(img_texture, 0, 0);

            try {
                bump(document.getElementById("canvas_composite"),
                    document.getElementById("canvas_texture"),
                    document.getElementById("canvas_normalmap"),
                    200,
                    260,
                    50
                );
            } catch(e) {
                alert(e);
            }
        }
        img_texture.src = "color_map.jpg";
     
    }
    img_normals.src = "normal_map.jpg";

}