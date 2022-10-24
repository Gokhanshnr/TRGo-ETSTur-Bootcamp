import PropTypes from 'prop-types'
import React, { Component } from 'react'

export class Homedesc extends Component {
  static propTypes = {}

  render() {
    return (
        <div className="container marketing">
        {/* Three columns of text below the carousel */}
        <div className="row">
          <div className="col-lg-4">
            <img src="./img/antalya.jpg" style={{borderRadius: '100px'}} width={160} height={160} alt="antalya" />
            <h2 className="fw-normal">Antalya</h2>
            <p>Antalyanın muhteşem otelleriyle tatilin keyfini çıkartın. TRGo ayrıcalığıyla otelleri keşfet</p>
            <p><a className="btn btn-primary" href="#">Fırsatları İncele »</a></p>
          </div>{/* /.col-lg-4 */}
          <div className="col-lg-4">
            <img src="./img/mugla.jpg" style={{borderRadius: '100px'}} width={160} height={160} alt="antalya" />
            <h2 className="fw-normal">Muğla</h2>
            <p>Muğlanın eşsiz güzelliklerini keşfetin. Doğayla iç içe olacağınız otelleri inceleyin.</p>
            <p><a className="btn btn-primary" href="#">Fırsatları İncele »</a></p>
          </div>{/* /.col-lg-4 */}
          <div className="col-lg-4">
            <img src="./img/izmir.jpg" style={{borderRadius: '100px'}} width={160} height={160} alt="antalya" />
            <h2 className="fw-normal">İzmir</h2>
            <p>İzmir otel fırsatlarını TRGo ile yakalayın. En uygun otelleri TRGo ile rezervasyon yapın </p>
            <p><a className="btn btn-primary" href="#">Fırsatları İncele »</a></p>
          </div>{/* /.col-lg-4 */}
        </div>{/* /.row */}
        {/* START THE FEATURETTES */}
        <hr className="featurette-divider" />
        <div className="row featurette">
          <div className="col-md-7">
            <h2 className="featurette-heading fw-normal lh-1">Antalya Otelleri <span className="text-muted">It’ll blow your mind.</span></h2>
            <p className="lead">Some great placeholder content for the first featurette here. Imagine some exciting prose here.</p>
          </div>
          <div className="col-md-5">
            <img src="./img/antalya.jpg" className="rounded" width={500} height={500} alt="antalya" />
          </div>
        </div>
        <hr className="featurette-divider" />
        <div className="row featurette">
          <div className="col-md-7 order-md-2">
            <h2 className="featurette-heading fw-normal lh-1">Oh yeah, it’s that good. <span className="text-muted">See for yourself.</span></h2>
            <p className="lead">Another featurette? Of course. More placeholder content here to give you an idea of how this layout would work with some actual real-world content in place.</p>
          </div>
          <div className="col-md-5 order-md-1">
            <img src="./img/izmir.jpg" className="rounded" width={500} height={500} alt="izmir" />
          </div>
        </div>
        <hr className="featurette-divider" />
        <div className="row featurette">
          <div className="col-md-7">
            <h2 className="featurette-heading fw-normal lh-1">And lastly, this one. <span className="text-muted">Checkmate.</span></h2>
            <p className="lead">And yes, this is the last block of representative placeholder content. Again, not really intended to be actually read, simply here to give you a better view of what this would look like with some actual content. Your content.</p>
          </div>
          <div className="col-md-5">
            <img src="./img/mugla.jpg" className="rounded" width={500} height={500} alt="mugla" />
          </div>
        </div>
        <hr className="featurette-divider" />
        {/* /END THE FEATURETTES */}
        
      </div>

      
    )
  }
}

export default Homedesc