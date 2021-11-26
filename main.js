
status1="";
object=[];

function setup()
{
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(480,380);
}
function draw()
{
    image(video,0,0,480,380);
    if(status1 !="")
    {
        objectDetector.detect(video, gotResults);
        for(i=0; i<object.length; i++){
            document.getElementById("status").innerHTML="Status : object detected";
           

            fill("#FF0000");
            percent=floor(object[i].confidence*100);
            text(object[i].label +" "+percent+"%",object[i].x + 15,object[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
            if(object[i].label==object_name){
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("object_status").innerHTML=object_name+" found ";
                synth=window.speechSynthesis;
                utterThis=new SpeechSynthesisUtterance(object_name+ " found ");
                synth.speak(utterThis);
            }
            else{
                document.getElementById(object_status).innerHTML=object_name+ "  Not found ";
            }
        }
    }
}
function start()
{
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status : detecting object";
    object_name=document.getElementById("object_name").value;
}
function modelLoaded()
{
    console.log("modelLoaded");
    status1=true;
    
}
function gotResults(error,results)
{
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object=results;
    }
}
