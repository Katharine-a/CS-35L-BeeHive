
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {useState} from "react";
import {Navigate} from "react-router-dom";

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}],
        ['link', 'image'],
        ['clean']
]
};
//this part isnt in finished tutorial
const formats = [
'header',
'bold', 'italic', 'underline', 'strike', 'blockquote',
'list', 'bullet', 'indent', 
'link', 'image'
]

//Inside each post we need an image, title, summary of the post, content
export default function CreatePost(){
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);


    async function createNewPost(ev){
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]); //even if you select many files it will just take the first one

        ev.preventDefault();
     const response = await fetch('http://localhost:4000/post', {
            method: 'POST', 
            body: data,
            credentials: 'include',
        });
       if (response.ok){
        setRedirect(true);
       }
    }

    if(redirect){
       return <Navigate to={'/'} />
    }
    return(
        <form onSubmit={createNewPost}>
            <input type="title"
                    placeholder={'Title'} 
                    value={title} 
                    onChange={ev => setTitle(ev.target.value)}/>
            <input type="summary" 
                    placeholder={'Summary'}
                    value={summary}
                    onChange={ev => setSummary(ev.target.value)}/>
            <input type="file"
                    onChange={ev => setFiles(ev.target.files)}/>
            <ReactQuill 
                        value={content}
                        onChange={newValue => setContent(newValue)}
                        module={modules}
                        formats={formats}/>
            <button style ={{marginTop:'5px'}}>Create Post</button>
        </form>
    );
}
//this stuff is different than finished tutorial 