import Rx from 'rxjs/Rx'
import io from 'socket.io-client'
import cookie from 'js-cookie'
import { Logger } from '../Utils/Decorator'

@Logger('SocketRx', true)
class SocketRx {
    constructor() {
        this.sokect = null
        this.robotStatus = null
        this.robotAction = null
        this.alarmEvent = null
        this.snapEvent = null
        this.Logger.success('初始化socket.io')
        this.behavitor = null
    }
    connect() {
        if (!this.sokect) {
            let url =
                process.env.NODE_ENV !== 'production'
                    ? `${window.location.hostname}:8890`
                    : '/'
            this.Logger.debug('第一次尝试连接socket.io')
            this.sokect = io(`${url}?token=${cookie.get('token')}`)
            this.sokect.on('connect', () => {
                this.Logger.success('连接成功')
            })
            this.sokect.on('disconnect', () => {
                this.Logger.warn('断开连接')
            })
        }
    }
    /**
     *  监听机器人状态
     */
    subscribeRobotStatus() {
        this.connect()
        if (!this.robotStatus) {
            this.robotStatus = Rx.Observable.fromEvent(
                this.sokect,
                'robot-status'
            )
        }
    }
    /**
     * 监听机器人任务
     */
    subscribeRobotAction() {
        this.connect()
        if (!this.robotAction) {
            this.robotAction = Rx.Observable.fromEvent(
                this.sokect,
                'robot-task'
            )
        }
    }
    
    /**
     * 告警
     */
    subscribeAlarm() {
        this.connect()
        if (!this.alarmEvent) {
            this.alarmEvent = Rx.Observable.fromEvent(
                this.sokect,
                'alarmEvent'
            )
        }
    }

    /**
     * 抓拍
     */
    subscribeSnap() {
        this.connect()
        if (!this.snapEvent) {
            this.snapEvent = Rx.Observable.fromEvent(
                this.sokect,
                'lyImageEvent'
            )
        }
    }

    /**
     * 行为识别
     */
    subscribeBehavitor() {
        this.connect()
        if (!this.behavitor) {
            this.behavitor = Rx.Observable.fromEvent(
                this.sokect,
                'robot-behavitor'
            )
        }
    }
}

export default new SocketRx()
