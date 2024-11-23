import { useEffect, useRef, useState } from "react"
import axois from "axios"
// import from "MathJax"


const colors=["red","green","yellow","pink","white"]

const Home = () => {

    const canvasReff =useRef(null)

    const [isDrawing,setIsDrawing] = useState(false)
    const [color,setColor] = useState("white");
    // const [latextExpression,setLatextExpression] = useState([]);
    // const [latPositon,setLatPosition] = useState({x:'10',y:'20'})
    const [img,setImg] = useState()
    const [reset,setReset] = useState(false);

    const [result,setResult]= useState(null)

    const [dictOfVars,setDictOfVars] = useState("")

    useEffect(()=>{
        if(!result)return

        result.map((item)=>{
            setDictOfVars({...dictOfVars,...item})
        })

        


    },[result])

    useEffect(()=>{
        if(!dictOfVars) return

        const canvas = canvasReff.current;

        if(canvas){
            const ctx = canvas.getContext('2d');

            if(ctx){

                ctx.fillStyle ="black";

                ctx.fillText(`${dictOfVars}`, 50, 50);

            }
        }

    })



    useEffect(()=>{
        const canvas =canvasReff.current;
        if(canvas){
            const ctx =canvas.getContext('2d');
            canvas.style.background ="black";

            if(ctx){
                canvas.width =window.innerWidth;
                canvas.height =window.innerHeight-canvas.offsetTop;
                ctx.lineCap = 'rounde';
                ctx.lineWidth =3
            }
        }

        // const script = document.createElement('script')
        // script.src ="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/config/TeX-MML-AM_CHTML.min.js";
        // script.async = true;
        // document.head.appendChild(script);


        // script.onload =() =>{
        //     window.MathJax.Hub.Config({
        //         tex2jax: {inlineMath: [['$', '$'], ['\\(', '\\)']]},
        //     });
        // }


        // return ()=>{
        //     document.head.removeChild(script);
        // }

    },[])
   

    useEffect(()=>{
        if(reset){
            resetCanvas();
            setResult(undefined)
            setReset(false)
        }
    },[reset])

    const resetCanvas =()=>{
          
        const canvas = canvasReff.current;
        if(canvas){
            const ctx = canvas.getContext('2d');
            if(ctx){
                ctx.clearRect(0,0,canvas.width,canvas.height)
            }
        }

    }

    const startDrawing =(e)=>{
        const canvas = canvasReff.current;

        if(canvas){
            
            const ctx = canvas.getContext('2d');
            if(ctx){
                ctx.beginPath();
                ctx.moveTo(e.nativeEvent.offsetX,e.nativeEvent.offsetY);
                setIsDrawing(true);

            }
        }
    }

    const stopDrawing =()=>{
        setIsDrawing(false)
    }


    const draw =(e)=>{
        if(!isDrawing){
          return
        }
        const canvas = canvasReff.current;
        if(canvas){
            const ctx = canvas.getContext('2d')
            if(ctx){
                ctx.strokeStyle =color
            ctx.lineTo(e.nativeEvent.offsetX,e.nativeEvent.offsetY);
            ctx.stroke()}

        }
    }


    const sendData = async()=>{
        const canvas =canvasReff.current;
        console.log("sending...")


        if(canvas){
            setImg(canvas.toDataURL('image/png'))

          const data={
                image:canvas.toDataURL('image/png'),
                dict_of_vars:dictOfVars
            }
           try {
            const  response = await axois.post("http://localhost:4000/process-image",data)

            // console.log(response.data.data)

            const data1= response.data.data;
            const data2 = data1.replace(/```json|```/g, '').trim();
              console.log(data2)
            setResult(JSON.parse(data2))
           } catch (error) {
            console.log("there is some error in the ")
            
           }

        }

    }

    // const err = []

    console.log(result)

  return (
    <>
    <div style={{
        display:"grid",
        gridTemplateColumns:"1fr 1fr 1fr",
        gap:"10px"
    }}>
        <button onClick={()=>setReset(true)} style={{
            backgroundColor:"black",
            color:"white",
            padding:"7px 10xp",
            zIndex:"20"
        }}>Reset Canvas</button>

<div style={{
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between",
     zIndex:"20"
}}>
    {
       colors && colors.map((color)=>{
            return(
                <div
                key={color}
                style={{
                   width:"20px",
                   height:"20px",
                   borderRadius:"50%",
                   backgroundColor:`${color}`
                }}
                onClick={()=>setColor(color)}
                ></div>
            )
        })
    }

</div>



<button onClick={sendData} style={{
            backgroundColor:"black",
            color:"white",
            padding:"7px 10xp",
            zIndex:"20"
        }}>calculate</button>





    </div>
    {/* <div style={{
        height:"40vh",
        width:"40vw",
        backgroundColor:"black",
        zIndex:"30"
    }}> 
    {
        img && (
            <img src={img} alt="takend" height="100%" width="100%"/>
        )
    }
         
    </div> */}


    <canvas
    id="canvas"
    ref={canvasReff}
    width={800}
    height={600}
    style={{
        position:"absolute",
        top:"0",
        left:"0",
        width:"100vw",
        height:"100vh"
        
    }}
    onMouseDown={startDrawing}
    onMouseOut={stopDrawing}
    onMouseUp={stopDrawing}
    onMouseMove={draw}
    />
    <div style={{
        marginTop:"100vh",
        width:"100vw",
        height:"10vh",
        backgroundColor:"pink"
    }}>
        
        {
        result && result.map((val,ind)=>{
            console.log(val)
            return <p key={ind}>{val.expr} and the result is {val.result}</p>
        })
    }
        
    </div>

</>
  )
}

export default Home
