import { Link, LoaderFunction, useLoaderData } from "react-router-dom";
import ContentTitle from "../../components/ContentTitle";
import Team from "../../modes/Team";

export const loader: LoaderFunction = async ({ params }) => {
    const team = await Team.get(params.teamId!);
    return { team };
}

export default function DetailTeamView() {
    const { team } = useLoaderData() as { team: Team; };
    return (
        <>
            <ContentTitle title={team.name} />

            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <th scope="row">ID</th>
                        <td>{team.id}</td>
                    </tr>
                    <tr>
                        <th scope="row">Name</th>
                        <td>{team.name}</td>
                    </tr>
                    <tr>
                        <th scope="row">Name Yomi</th>
                        <td>{team.name_yomi}</td>
                    </tr>
                    <tr>
                        <th scope="row">Homepage URL</th>
                        <td>
                            {team.homepage_url ? <Link to={team.homepage_url} >{team.homepage_url}</Link> : null}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Color Primary</th>
                        <td>{team.color_primary}</td>
                    </tr>
                    <tr>
                        <th scope="row">Color Secondary</th>
                        <td>{team.color_secondary}</td>
                    </tr>
                    <tr>
                        <th scope="row">Icon Image</th>
                        <td>
                            <div>
                                {team.icon_image_url ? <img src={team.icon_image_url} alt={team.name} style={{maxWidth: 128, maxHeight: 128}} /> : null}
                            </div>
                            <span>{team.icon_image_url ?? "未設定"}</span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <Link className="btn btn-secondary" to={`/teams/${team.id}/edit`}>Edit</Link>
        </>
    );
}