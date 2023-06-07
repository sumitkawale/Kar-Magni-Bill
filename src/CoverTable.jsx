export default function CoverTable(props) {
    return <>
        <table border={"1px"}>
            <thead>
                <tr>
                    <td className="paddingL5">अ.क्र.</td>
                    <td className="paddingL5">मालमत्ता क्र.</td>
                    <td className="paddingL5">ज्या इसमाकडून कर येणे आहे त्याचे नाव</td>
                </tr>
            </thead>
            <tbody>
                {
                    props?.data?.map((data, id) => {
                        data = Object.entries(data)
                        return <>
                            <tr key={id + "innerData"}>
                                <td className="text-center">{data[0][1]}</td>
                                <td className="text-center">{data[1][1]}</td>
                                <td className="paddingL5">{data[2][1]}</td>
                            </tr>
                        </>
                    })
                }
            </tbody>
        </table>
    </>
}