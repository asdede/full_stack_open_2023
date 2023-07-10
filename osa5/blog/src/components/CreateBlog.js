
const CreateBlog = ({title,author,setTitle,
                    setAuthor,handleSubmit,
                    url,setUrl}) => {

    return (
        <div className="createblog">
            <form onSubmit={handleSubmit}>
                <h3>Create new blog</h3>
                <div>
                    Title
                    <input
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({target}) => setTitle(target.value)} 
                />
                </div>
                <div>
                    Author
                    <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({target}) => setAuthor(target.value)} />
                </div>
                <div>
                    Url
                    <input
                    type="text"
                    value={url}
                    name="url"
                    onChange={({target}) => setUrl(target.value)} />
                </div>
            <button type="submit">Create</button>

            </form>
        </div>
    )
}

export default CreateBlog