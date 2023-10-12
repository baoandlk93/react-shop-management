import { ScrollPanel } from 'primereact/scrollpanel';
function Content({children}) {
return(
    <>
        <div className="w-full left-0">
        {children}
        </div>
    </>
)
}

export default Content;