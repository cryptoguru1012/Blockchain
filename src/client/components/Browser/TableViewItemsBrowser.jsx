import React from 'react';
import { Link } from 'react-router';
import VideoPlayer from '../Store/VideoPlayer'
function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
const styles = {
    imageContainer: function(url) {
        return {
            width: '100px',
            height: '100px',
            marginRight: '20px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#fff',
            backgroundImage: url
        }
    },
    videoContainer: {
        width: '100px',
        height: '100px',
        overflow: 'hidden',
        backgroundColor: '#fff',
        position: 'relative'
    },
    video: {
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100%',
        height: '100%'
    },
    txtHeader:{
        color: 'red'
    }
}
class TableViewItemsBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.getMedia = this.getMedia.bind(this);
        this.sortItems = this.sortItems.bind(this);
        this.state = {
            thSortBy: '',
            thSortAZ: true
        }
    }
    getMedia(description) {
        if (isJson(description)) {
            description = JSON.parse(description);
            return {
                type: 'video',
                value: description
            }
        } else {
            let hasImages = description.match(/https?:\/\/.*\.(?:png|jpg|gif)/g);
            if (hasImages) {
                return {
                    type: 'image',
                    value: hasImages[0]
                }
            } else {
                return false;
            }
        }
    }
    renderMedia(data) {
        if (data.type === 'video') {
            return (
                <div style={styles.videoContainer}>
                    <VideoPlayer 
                    style={styles.video}
                    url={data.value.urlVideo}
                    subtitles={data.value.subtitlesVideo}
                    playOnHover
                    hideControls
                    muted/>
                </div>
            )
        }
        else {
            const url = `url(${data.value})`
            return (
                <div style={styles.imageContainer(url)}>
                </div>    
            )
        }
    }
    sortItems(items) {
        let field = this.state.thSortBy;
        let order = this.state.thSortAZ;
        let sortedItems;
        if (order){
            sortedItems = field !== '' ? items.slice(0).sort((a, b)=> a[field].localeCompare(b[field])) : items;
        }else{
            sortedItems = field !== '' ? items.slice(0).sort((b, a)=> a[field].localeCompare(b[field])) : items;
        }
        
        console.log("items: ", items[0].title);
        console.log("Ordenado por: ", field);
        console.log("sortedItems: ", sortedItems[0].title);
        console.log("orderAZ: ", this.state.thSortAZ);
        return sortedItems
    }
    thClick(field){
        if (field === this.state.thSortBy) {
            this.setState({'thSortAZ': !this.state.thSortAZ,'thSortBy': field})
        }else{
            this.setState({'thSortAZ': true,'thSortBy': field});
        }
    }
    render() {
        //const itemsOutput = this.props.items.map((item) => {
        const itemsOutput = this.sortItems(this.props.items).map((item) => {
            const mediaData = this.getMedia(item.description);
            return (
                <tr key={item.txid}>
                    {this.props.media && <th>{this.renderMedia(mediaData)}</th>}
                    <td><Link to={'/offer/' + item.offer}>{item.title}</Link></td>
                    <td>{item.alias}</td> 
                    <td>{item.price}</td>
                    <td>{item.currency}</td>
                </tr>
            );
        });
        return (
            <table className="grids">
                <thead style={styles.txtHeader}>
                    <tr>
                        {this.props.media && <th>Media</th>}
                        <th><a href="#" onClick={() => {this.thClick('title')}}>Title</a></th>
                        <th><a href="#" onClick={() => {this.thClick('alias')}}>Vendor</a></th> 
                        <th>Price</th>
                        <th><a href="#" onClick={() => {this.thClick('currency')}}>Currency</a></th>
                    </tr>
                </thead>
                <tbody>
                    {itemsOutput}
                </tbody>
            </table>
        );
    }
}
export default TableViewItemsBrowser;