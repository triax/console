import { useNavigate } from "react-router-dom";
import Game, { Status } from "../../modes/Game"

function statusClassName(status: Status): string {
    switch (status) {
        case Status.DRAFT:    return "bg-info text-white";
        case Status.STANDBY:  return "bg-primary text-white";
        case Status.ONGOING:  return "bg-warning";
        case Status.FINISHED: return "bg-success text-white";
        case Status.CLOSED:   return "bg-secondary text-white";
        default:              return "bg-danger text-white";
    }
}

export default function ListGamesRowView({ game }: {
    game: Game;
}) {
    const navigagte = useNavigate();
    const updateStatus = async (next: Status) => {
        game.status = next;
        await game.upsert();
        navigagte("/games"); // reload
    }
    return (
        <tr key={game.id}>
            <td>
                <select
                    className={"form-select " + statusClassName(game.getStatus())}
                    style={{ fontSize: "0.8rem", width: "8rem" }}
                    defaultValue={game.getStatus()}
                    onChange={(e) => updateStatus(e.target.value as Status)}
                >
                    {Object.values(Status).map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
            </td>
            <td>
                <div>{game.kick_off.toLocaleDateString()}</div>
                <div>{game.kick_off.toLocaleTimeString()}</div>
            </td>
            <td>
                <div>{game.home.name}</div>
                {game.home.icon_image_url ? <img src={game.home.icon_image_url} style={{ height: 32 }} /> : null}
            </td>
            <td>
                <div>{game.visitor.name}</div>
                {game.visitor.icon_image_url ? <img src={game.visitor.icon_image_url} style={{ height: 32 }} /> : null}
            </td>
            <td>{game.venue}</td>
            <td>{JSON.stringify(game.result)}</td>
        </tr>

    )
}