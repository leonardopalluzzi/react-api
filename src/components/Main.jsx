export default function Main({ handleModify, postsData, handleDelete, endpoint, imgPath }) {

    /**
 * Truncates a given text to a specified maximum length and appends "..." if truncated.
 * @param {string} text - The text to be truncated.
 * @param {number} maxLength - The maximum allowed length of the text.
 * @returns {string} - The truncated text.
 */
    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    }

    return (
        <main>
            <div className="container">
                <div className="table-responsive">
                    <table
                        className="table table-white"
                    >
                        <thead>
                            <tr className="titles">
                                <td scope="row">IMG</td>
                                <td>Title</td>
                                <td>Content</td>
                                <td>TAGS</td>
                                <td>Operations</td>
                            </tr>
                        </thead>
                        <tbody>

                            {postsData.map(post => (
                                <tr key={post.slug} className="post_row">
                                    <td>
                                        <img className='post_img' src={imgPath + post.image} alt="" /></td>
                                    <td scope="row">{post.title}</td>
                                    <td>{truncateText(post.content, 50)}</td>
                                    <td>
                                        <ul className="tag_list">
                                            {/* {post.tags.map((tag, i) => (
                                                <li key={`tag-${i}`}>{tag}, </li>
                                            ))} */}
                                        </ul>
                                    </td>


                                    <td>
                                        <div className="container">
                                            <div className="row">
                                                <button onClick={() => handleDelete(endpoint, post.title)} className='col-6 btn btn-danger'>Delete</button>
                                                <button onClick={() => handleModify(slug, post.title)} className='col-6 btn btn-primary'>Modify</button>
                                            </div>

                                        </div>

                                    </td>
                                </tr>


                            ))}




                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}