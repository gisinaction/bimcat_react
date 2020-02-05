import * as THREE from 'three';
class ViewUtils{
    constructor(objects,controls,camera){
        this._objects=objects;
        this._controls=controls;
        this._camera=camera;
        this._aabbCenter=new THREE.Vector3();
        this._offset=0;
        this.zoomExtents();
    }
    zoomExtents(){
        
        let aabbMin = new THREE.Vector3();
        let aabbMax = new THREE.Vector3();
        let radius = 0;
        //遍历所有的元素，取得元素的boundingBox的最大值和最小值，从而确定模型的范围
        for (let obj of this._objects)
        {
            aabbMin.x = Math.min(aabbMin.x, obj.position.x);
            aabbMin.y = Math.min(aabbMin.y, obj.position.y);
            aabbMin.z = 0;
            aabbMax.x = Math.max(aabbMax.x, obj.position.x);
            aabbMax.y = Math.max(aabbMax.y, obj.position.y);
            aabbMax.z = 0;
        }
    
        // 计算所有元素的中心
        let aabbCenter = new THREE.Vector3();
        aabbCenter.x = (aabbMax.x + aabbMin.x) * 0.5;
        aabbCenter.y = (aabbMax.y + aabbMin.y) * 0.5;
        aabbCenter.z = (aabbMax.z + aabbMin.z) * 0.5;
    
        // 计算所有元素组成的boundingBox半径
        let diag = new THREE.Vector3();
        diag = diag.subVectors(aabbMax, aabbMin);
        radius = diag.length() * 0.5;
    
        // 计算相机据计算所有元素的中心的距离
        let offset = radius / Math.tan(Math.PI / 180.0 * this._controls.object.fov * 0.5);
    
        // 计算相机的位置
        let vector = new THREE.Vector3(0,0,1);
        let dir=vector.normalize();
        dir.multiplyScalar(offset);
        let newPos = new THREE.Vector3();
        newPos.addVectors(aabbCenter, dir);
    
        //设置相机的位置

        this._camera.position.set(newPos.x,newPos.y,newPos.z);
        this._camera.up=new THREE.Vector3(0,1,0);
        this._camera.lookAt(aabbCenter);
        this._controls.target= aabbCenter;  // 保证相机对准中心后，鼠标的控制点也对应着中心
        this._aabbCenter=aabbCenter;
        this._offset=offset;
    }

    homeOrientation(){
        let vector=new THREE.Vector3(1,1,1).normalize();
        this.setOrientation(vector);
    }

    topOrientation(){
        let vector=new THREE.Vector3(0,0,1);
        this.setOrientation(vector);
    }
    bottomOrientation(){
        let vector=new THREE.Vector3(0,0,-1);
        this.setOrientation(vector);
    }
    leftOrientation(){
        let vector=new THREE.Vector3(1,0,0);
        this.setOrientation(vector);
    }
    rightOrientation(){
        let vector=new THREE.Vector3(-1,0,0);
        this.setOrientation(vector);
    }
    frontOrientation(){
        let vector=new THREE.Vector3(0,1,0);
        this.setOrientation(vector);
    }
    backOrientation(){
        let vector=new THREE.Vector3(0,-1,0);
        this.setOrientation(vector);
    }
    centerOrientation(){
        let vector=new THREE.Vector3(0,1,0);
        let dir= new THREE.Vector3().copy(vector);
        dir.multiplyScalar(this._offset*0.1);
        let newPos = new THREE.Vector3();
        newPos.addVectors(this._aabbCenter, dir);
        this._camera.position.set(newPos.x,newPos.y,newPos.z);
        if(vector.z===1||vector.z===-1){
            this._camera.up=new THREE.Vector3(0,1,0);
        }else{
            this._camera.up=new THREE.Vector3(0,0,1);
        }
        this._camera.lookAt(this._aabbCenter);
        this._controls.target= this._aabbCenter;
    }

    setOrientation(vector){
        let dir= new THREE.Vector3().copy(vector);
        dir.multiplyScalar(this._offset);
        let newPos = new THREE.Vector3();
        newPos.addVectors(this._aabbCenter, dir);
        this._camera.position.set(newPos.x,newPos.y,newPos.z);
        if(vector.z===1||vector.z===-1){
            this._camera.up=new THREE.Vector3(0,1,0);
        }else{
            this._camera.up=new THREE.Vector3(0,0,1);
        }
        this._camera.lookAt(this._aabbCenter);
        this._controls.target= this._aabbCenter;
    }
}

export default ViewUtils;