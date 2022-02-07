import "./collection-preview.styles.scss"

const CollectionPreview = ({ title, items }) => (
    <div className="collection-preview">
        <h1 class="title">{title.toUpperCase()}</h1>
        <div className="preview">
            {
                items
                    .filter((item, ndx) => ndx < 4)
                    .map((item) => (
                        <div key={item.id}>{item.name}</div>
                    ))
            }
        </div>
    </div>
)

export default CollectionPreview