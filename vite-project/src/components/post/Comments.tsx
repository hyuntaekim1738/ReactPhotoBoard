//this page will be the comments display list featuring the comment form, the caption, and every comment using a table
import CommentForm from './CommentForm';
interface Props {
    handleX: () => void
}
const Comments = ({ handleX }: Props) => {
    return (
        <>
            <div className="overlay">
                <div className="partial-window comment-pane container-fluid">
                    <CommentForm></CommentForm>
                    <button className="btn btn-danger close-button" onClick={handleX}>X</button>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Comment</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
export default Comments;