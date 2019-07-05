import React, {Component} from "react";
import PropTypes from "prop-types";
import ItemStats from "./ItemStats";

export default class ItemDescription extends Component {

    static propTypes = {
        item: PropTypes.object,
        onUnequip: PropTypes.func,
        onEquip: PropTypes.func
    };

    render() {
        return (
            <div>

                <div style={{
                    display: "inline-block"
                }}>
                    Level: {this.props.item.level}&nbsp;
                </div>

                <div style={{
                    display: "inline-block"
                }}>
                    {this.props.item.name}
                </div>

                <ItemStats item={this.props.item}/>

                {
                    !this.props.item.equiped && true === false ?
                        <button className='rpgui-button'>
                            <span>Disentchant</span>
                        </button>
                        : null
                }

                {
                    this.props.item.equiped ?
                        <button className='rpgui-button'
                                onClick={() => this.props.onUnequip(this.props.item)}>
                            <span>Unequip</span>
                        </button>
                        :
                        <button className='rpgui-button'
                                onClick={() => this.props.onEquip(this.props.item)}>
                            <span>Equip</span>
                        </button>
                }

            </div>
        )
    }
}