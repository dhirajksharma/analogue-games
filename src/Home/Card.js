import React from 'react';
import {Link} from 'react-router-dom';

class Card extends React.Component{
    
    render(){
        return (
            <div className={'mx-2 shadow-slate-800 dark:shadow-slate-500 shadow-md max-w-[500px] sm:max-w-[600px] min-h-[55vh] overflow-hidden rounded-lg flex flex-col justify-end '+this.props.imgurl}>
                <div className='bg-gradient-to-t from-black text-white min-h-[12rem] flex flex-col justify-end p-2 pb-4'>
                    <h3 className='font-konkhmer tracking-wider uppercase'>{this.props.name}</h3>
                    <p className='font-poppins text-sm'>{this.props.cont}</p>
                </div>
            </div>
        );
    }
}

export default Card;