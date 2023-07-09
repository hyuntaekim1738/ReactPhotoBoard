import ProfilePicture from '../profile/ProfilePicture';

const AccountsList = () => {
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Account</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><ProfilePicture></ProfilePicture></td>
                        <td>Account name</td>
                        <td><button className="btn btn-primary">Follow/Accept (take prop)</button></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
export default AccountsList;