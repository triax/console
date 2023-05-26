import { useLoaderData, type LoaderFunction } from "react-router-dom";
import ContentTitle from "../components/ContentTitle";
import Member from "../modes/Member";
import Team from "../modes/Team";
import CloudflareImageService from "../services/Image";

export const loader: LoaderFunction = async ({ params }) => {
    const members: Member[] = await Member.list(params.teamId!);
    const team = await Team.get(params.teamId!);
    return {
        members: Member.sort(members),
        team,
    };
}

export default function MembersView() {
    const { members, team } = useLoaderData() as { members: Member[]; team: Team; };
    const s = new CloudflareImageService("https://console.triax.football");
    return (
        <>
            <ContentTitle title={`${team.name} メンバー表`} />

            <div>
                <input type="file" accept=".csv"
                    onChange={async (e) => {
                        const f = e.currentTarget.files?.item(0);
                        if (!f) return;
                        const members = await Member.parseCSV_v20230523(f, team.id);
                        const inserted = await Promise.all(members.map(async (m) => {
                            m.profile_image_url = await s.transferToCloudflare(m.profile_image_url);
                            return await m.insert();
                        }));
                        console.log(inserted);
                    }}
                />
            </div>


            {/* Member[]のテーブルを描画 */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th></th>
                        <th scope="col">名前</th>
                        <th scope="col">読み</th>
                        <th scope="col">コメント</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                        <tr key={member.id}>
                            <td>
                                {member.number}
                            </td>
                            <td>
                                {member.profile_image_url && (
                                    <img src={member.profile_image_url} style={{height: "2rem"}} />
                                )}
                            </td>
                            <td>
                                {member.name}
                                <div style={{fontSize: "0.6em"}}>{member.id}</div>
                            </td>
                            <td>
                                <div>{member.name_yomi}</div>
                                <div>{member.name_eng}</div>
                            </td>
                            <td>{member.comment}</td>
                        </tr>
                    ))}
                </tbody>
            </table>




            {/* <canvas className="my-4 w-100" id="myChart" width="2352" height="993"
                style="display: block; box-sizing: border-box; height: 496px; width: 1176px;"
            ></canvas> */}

        </>
    );
}