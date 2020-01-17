import EventEmitter from "./eventEmitter";
import EventName from "./eventName";

const url = process.env.NODE_ENV !== "production" ? `${window.location.hostname}:8892/socket.io` : "/socket.io";

class SocketEmitter extends EventEmitter {
  eventName = EventName;
  connect() {
    if (this.sokect) {
      return;
    }
    const token = Utils.getCache("token", "session");
    console.info("%c[socket]  %c第一次尝试连接", "color:blue", "color:blue");
    this.sokect = io(url, { path: "/socket.io", query: { token }, transports: ["websocket"] });
    this.sokect.on(this.eventName.connect, () => {
      console.info("%c[socket]  %c连接成功", "color:blue", "color:green");
    });
    this.sokect.on(this.eventName.disconnect, () => {
      console.warn("[socket]  %c断开连接", "color:red");
    });

    //TODO 订阅所有事件
    this.subscribeAllRealAlarm();
    this.libsImportEvent();
    this.subscribeAlarmNum();
    this.communityPeopleUpload();
    this.subscribeDeviceChange();
    this.subscribePreventionAlarmMessage();
    this.subscribeVehicleAlarmMessage();
    this.subscribeWithoutCloakMessage();
    this.subscribePersonAbnormalActivityMessage();
    this.subscribeAbnormalPersonActivityMessage();
    this.subscribeAbnormalPopulationActivity();

  }
  disconnect() {
    this.clear();
    this.sokect && this.sokect.disconnect();
    this.sokect = null;
  }
  /**
   * 监听所有报警信息
   * @update hjj 2018年10月15日12:25:36
   */
  subscribeAllRealAlarm() {
    this.sokect.on(this.eventName.alarm, data => {
      let json;
      try {
        json = JSON.parse(data);
      } catch (e) {
        data = json;
      }
      this.emit(this.eventName.alarm, json);
    });
  }

  /**
   * 监听布控一体机导入成功事件
   * @update hjj 2018年10月15日12:25:36
   */
  libsImportEvent() {
    this.sokect.on(this.eventName.importLib, data => {
      let json;
      try {
        json = JSON.parse(data);
      } catch (e) {
        json = data;
      }
      this.emit(this.eventName.importLib, json);
    });
  }

  /**
   * 监听社区人员导入成功事件
   * @update zcx 2018年11月24日14:02:36
   */
  communityPeopleUpload() {
    this.sokect.on(this.eventName.importVillage, data => {
      let json;
      try {
        json = JSON.parse(data);
      } catch (e) {
        json = data;
      }
      this.emit(this.eventName.importVillage, json);
    });
  }

  /**
   * 推送报警数量
   * @update hjj 2018年10月15日12:25:36
   */
  subscribeAlarmNum() {
    this.sokect.on(this.eventName.alarmNum, data => {
      let json;
      try {
        json = JSON.parse(data);
      } catch (e) {
        json = data;
      }
      this.emit(this.eventName.alarmNum, json);
    });
  }

  /**
   * 推送设备变化
   * @update hjj 2018年10月15日12:25:36
   */
  subscribeDeviceChange() {
    this.sokect.on(this.eventName.device, data => {
      let json;
      try {
        json = JSON.parse(data);
      } catch (e) {
        json = data;
      }
      this.emit(this.eventName.device, json);
    });
  }

  /**
   * 监听防控告警通知
   */
  subscribePreventionAlarmMessage() {
    this.sokect.on(this.eventName.preventionAlarmMessage, data => {
      let json;
      try {
        json = JSON.parse(data);
      } catch (e) {
        data = json;
      }
      this.emit(this.eventName.preventionAlarmMessage, json);
    });
  }

   /**
   * 监听车辆告警通知
   */
  subscribeVehicleAlarmMessage() {
    this.sokect.on(this.eventName.vehicleAlarmMessage, data => {
      let json;
      try {
        json = JSON.parse(data);
      } catch (e) {
        data = json;
      }
      this.emit(this.eventName.vehicleAlarmMessage, json);
    });
  }
   /**
   * 监听未带衣帽进入后厨通知
   */
  subscribeWithoutCloakMessage() {
    this.sokect.on(this.eventName.withoutCloakMessage, data => {
      let json;
      try {
        json = JSON.parse(data);
      } catch (e) {
        data = json;
      }
      this.emit(this.eventName.withoutCloakMessage, ['withoutCloakMessage', json]);
    });
  }

  /**
   * 监听人员多点异常活动
   */
  subscribePersonAbnormalActivityMessage() {
    this.sokect.on(this.eventName.personAbnormalActivityMessage, data => {
      let json;
      try {
        json = JSON.parse(data);
      } catch (e) {
        data = json;
      }
      this.emit(this.eventName.personAbnormalActivityMessage, ['personAbnormalActivityMessage', json]);
    });
  }

   /**
   * 监听异常人员活动
   */
  subscribeAbnormalPersonActivityMessage() {
    this.sokect.on(this.eventName.abnormalPersonActivityMessage, data => {
      let json;
      try {
        json = JSON.parse(data);
      } catch (e) {
        data = json;
      }
      this.emit(this.eventName.abnormalPersonActivityMessage, ['abnormalPersonActivityMessage', json]);
    });
  }

  /**
   * 监听异常群体活动
   */
  subscribeAbnormalPopulationActivity() {
    this.sokect.on(this.eventName.abnormalPopulationActivity, data => {
      let json;
      try {
        json = JSON.parse(data);
      } catch (e) {
        data = json;
      }
      this.emit(this.eventName.abnormalPopulationActivity, ['abnormalPopulationActivity', json]);
    });
  }


}

export default new SocketEmitter();
