import "./menu-item.styles.scss"

const MenuItem = ({ title, imageURL, size }) => (
    <div
        className={`menu-item ${size ? size : ""}`}>
        <div
            className="background-image"
            style={{
                backgroundImage: `url(${imageURL})`
            }}>
        </div>
        <div className="content">
            <h1 className="title">{title.toUpperCase()}</h1>
            <span class="subtitle">SHOP NOW</span>
        </div>
    </div>
)

export default MenuItem