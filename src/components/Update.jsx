export default function Update({ handleUpdate, udpateObj, handleSubmit, postTitle, setDisplay }) {
    return (
        <div className="container data-bs-theme={'dark'} mt-5">
            <h2>Modifica il post: {postTitle}</h2>

            <form onSubmit={handleSubmit} method="PUT">


                <div className="mb-3">
                    <label htmlFor="" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        id="title"
                        placeholder="title"
                        onChange={handleUpdate}
                        value={udpateObj.title}
                    />
                    <small id="helpId" className="form-text text-muted">Inserisci titolo</small>
                </div>

                <div className="mb-3">
                    <label htmlFor="" className="form-label">IMG</label>
                    <input
                        type="text"
                        className="form-control"
                        name="image"
                        id="image"
                        placeholder="img src"
                        onChange={handleUpdate}
                        value={udpateObj.image}
                    />
                    <small id="helpId" className="form-text text-muted">Inserisci IMG src</small>
                </div>

                <div className="mb-3">
                    <label htmlFor="" className="form-label">Content</label>
                    <textarea
                        type="text"
                        className="form-control"
                        name="content"
                        id="content"
                        placeholder="content"
                        onChange={handleUpdate}
                        value={udpateObj.content}
                    />
                    <small id="helpId" className="form-text text-muted">Inserisci content</small>
                </div>

                <div className="mb-3">
                    <label htmlFor="" className="form-label">TAGS</label>
                    <input
                        type="text"
                        className="form-control"
                        name="tags"
                        id="tags"
                        placeholder="tag, tag, tag, ..."
                        onChange={handleUpdate}
                        value={udpateObj.tags}
                    />
                    <small id="helpId" className="form-text text-muted">Inserisci i TAGS separati da una virgola</small>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>


            </form>
            <button onClick={() => setDisplay(false)} className="btn btn-danger btn-overlay">Close</button>
        </div>

    )
}