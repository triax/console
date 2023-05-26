import { Link, useLoaderData, type LoaderFunction } from "react-router-dom";
import ContentTitle from "../../components/ContentTitle";
import Team from "../../modes/Team";

export const loader: LoaderFunction = async () => {
    const teams = await Team.list();
    return { teams };
};

export default function ListTeams() {
    const { teams } = useLoaderData() as { teams: Team[]; };
    return (
        <>
            <ContentTitle title="Teams" />

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Team Name</th>
                        <th scope="col">Homepage URL</th>
                        <th scope="col">Color Primary</th>
                        <th scope="col">Color Secondary</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* map through teams and display each team's info */}
                    {teams.map((team) => (
                        <tr key={team.id}>
                            <td scope="row">
                                {team.icon_image_url ? <img src={team.icon_image_url} alt={team.name} style={{maxWidth: 32, maxHeight: 32}} /> : null}
                                <Link to={`/teams/${team.id}`} style={{fontSize: "x-small"}}>{team.id}</Link>
                            </td>
                            <td>
                                <Link to={`/teams/${team.id}`}>{team.name}</Link>
                            </td>
                            <td>{team.homepage_url}</td>
                            <td><span style={{color: team.color_primary}}>{team.color_primary}</span></td>
                            <td><span style={{color: team.color_secondary}}>{team.color_secondary}</span></td>
                            <td>
                                <Link to={`/teams/${team.id}/members`} className="btn btn-primary btn-sm">部員編集</Link>
                            </td>
                            <td>
                                <Link to={`/teams/${team.id}/edit`} className="btn btn-secondary btn-sm">Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                {/* button that leads to /teams/new page to create new team */}
                <Link to="/teams/new" className="btn btn-primary">
                    <i className="bi bi-plus"></i>
                    Create New Team
                </Link>
            </div>
        </>
    );
}