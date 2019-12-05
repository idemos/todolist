import React from 'react';
import Main from './Main';



//class Modal extends Main {
class Modal extends React.Component {
//function Modal(props) {
	constructor(props){
		super(props);
		//this.state = {}
	}

	handleClick(e){
		// (new Main).createUserLocal(e);
		// this.createUserLocal(e);
		(new Main).createUser(e);
	}

	render(){
		return (
			<main className="col-md-8" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<input type="name" className="form-control" />
							<input type="email" className="form-control" />
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
							<button type="button" className="btn btn-primary" onClick={(e) => this.handleClick(e) }>Save changes</button>
						</div>
					</div>
				</div>
			</main>
		);
	}
}


export default Modal;
