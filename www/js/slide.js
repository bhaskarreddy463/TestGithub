var picture = []
var count=0;

function inti()
{
                picture[0]=new Image()
                picture[0].src="images/big-img.png"
                picture[1]=new Image()
                picture[1].src="images/a1.jpg"
                picture[2]=new Image()
                picture[2].src="images/a2.jpg"
                picture[3]=new Image()
                picture[3].src="images/a3.jpg"
                
 }
function next()
{
                if( count<3)
                {
                    count++
                    document.getElementById("p1").setAttribute("src",picture[count].src);                
                }
                if( count==3)
				{
                count=0;
                }
}
function prev()
{
                
                if( count>0)
                {
                count--;
                document.getElementById("p1").setAttribute("src",picture[count].src);
                }
                if( count==0)
				{
                count=3;
                }
}
