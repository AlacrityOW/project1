document.addEventListener("DOMContentLoaded",()=>{
    let rtx = document.getElementById("response-text")
    console.log("IM IN")
    const form = document.getElementById("uploadForm")
    let fupl = document.getElementById("input-file")
    let fna = document.getElementById("file-name")
    fupl.addEventListener("change", (event)=>{
        const list =event.target.files
        if(list.length > 0){
            const name = list[0].name;
            fna.textContent = name;
        }else{
            fna.textContent = "";
        }
    })
    form.addEventListener("submit",async(e)=>{
        e.preventDefault()
        const formData = new FormData(form)
        try {
            const response = await axios.post("/api/upload",formData)
            console.log(response)
            let {data:{msg}} = response
            rtx.textContent = msg
            setTimeout(()=>{
                window.location.href = "/successful-upload"
            },3000)
        } catch (error) {
            let{data:{msg}} = error.response
            rtx.textContent = msg
        }
    })

    const button = document.querySelector("button")
    button.addEventListener("click",()=>{
        console.log("Button clicked")
    })
})
