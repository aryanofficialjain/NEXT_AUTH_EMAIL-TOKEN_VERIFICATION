export default function profileparams({params}: any){
    
    return <>
    <h1>This is a params page</h1>
    <p className="p-3 bg-orange-500">{params.id}</p>
    </>
}