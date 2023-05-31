import { Link, type LoaderFunction, useLoaderData } from "react-router-dom";
import Game from "../../modes/Game";
import ContentTitle from "../../components/ContentTitle";
import ListGamesRowView from "./ListRow";

export const loader: LoaderFunction = async () => {
    const games: Game[] = await Game.list();
    return { games };
};

export default function ListGamesView() {
    const { games } = useLoaderData() as { games: Game[] };
    return (
        <>
            <ContentTitle title="Games" />

            <Link to="/games/new" className="btn btn-primary">新規追加</Link>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Datetime</th>
                        <th>Home</th>
                        <th>Visitor</th>
                        <th>Venue</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map((game) => <ListGamesRowView key={game.id} game={game} />)}
                </tbody>

            </table>
        </>
    );
}