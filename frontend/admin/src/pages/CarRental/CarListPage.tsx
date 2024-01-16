import { useFetch } from "../../hooks/useFetch"
const URL = 'http://localhost:8000/api/';
export default function CarListPage() {
    const { data, error } = useFetch<any>(URL+'', { method: "GET" });
    if (error) return <>Error</>
    if (!data) return <>Loading...</>
    return (<>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
            {
                data && data.map((e: any, i: number) => {
                    return <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark pb-0">
                        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 p-6.5">
                            Car Details and actions here
                        </div>
                    </div>
                })
            }

            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark pb-0">
                <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 p-6.5">
                    Car Details and actions here
                </div>
            </div>
        </div>
    </>
    )
}