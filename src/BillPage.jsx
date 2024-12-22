import Bill from "./Bill";

export default function BillPage(props) {
    return <div className='billPage'>
        <Bill data={props.data} basicDetails={props?.basicDetails} />
        <div className='billSeparator'></div>
        <Bill data={props.data} basicDetails={props?.basicDetails} />
    </div>
}