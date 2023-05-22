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
                    </tr>
                </thead>
                <tbody>
                    {/* map through teams and display each team's info */}
                    {teams.map((team) => (
                        <tr key={team.id}>
                            <th scope="row">
                                <Link to={`/teams/${team.id}`}>{team.id}</Link>
                            </th>
                            <td>
                                <Link to={`/teams/${team.id}`}>{team.name}</Link>
                            </td>
                            <td>{team.homepage_url}</td>
                            <td>{team.color_primary}</td>
                            <td>{team.color_secondary}</td>
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