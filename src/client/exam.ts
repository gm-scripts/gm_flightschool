import { conf, lang, wait, missionText, notifyText, error } from "./utils";
import { script } from "../config";

let waitForSync = false;

const startExam = async (examLabel: string): Promise<void> => {
  const player = PlayerPedId();
  let examVehicle: string;
  let licenseType: string;
  let plate: number;
  switch (examLabel) {
    case lang["menu"].exams.plane:
      examVehicle = "plane";
      licenseType = "drive_plane";
      plate = 7;
      break;
  }
  const vehicleHash = GetHashKey(conf["vehicle"][examVehicle].model);
  RequestModel(vehicleHash);
  while (!HasModelLoaded(vehicleHash)) {
    await wait(0);
  }
  const vehicle = CreateVehicle(
    vehicleHash,
    conf["school"].spawn.x,
    conf["school"].spawn.y,
    conf["school"].spawn.z,
    conf["school"].spawn.h,
    true,
    true,
  );
  SetVehicleColours(vehicle, conf["vehicle"][examVehicle].color, 0);
  SetVehicleLivery(vehicle, conf["vehicle"][examVehicle].livery);
  TaskWarpPedIntoVehicle(player, vehicle, -1);
  SetVehicleFuelLevel(vehicle, 100.0);
  DecorSetFloat(vehicle, "_FUEL_LEVEL", GetVehicleFuelLevel(vehicle));
  const generatePlate = (): string => {
    return `SCHOOL${plate}${Math.floor(Math.random() * 9) + 1}`;
  };
  SetVehicleNumberPlateText(vehicle, generatePlate());
  /// TESTING
  let currentCheckPoint = -1;
  let lastCheckPoint = -2;
  let driveErrors = 0;
  let healthDelay = false;
  let currentBlip = undefined;
  const makeMistake = async () => {
    healthDelay = true;
    notifyText(lang["damaged"]);
    driveErrors++;
    notifyText(
      lang["mistakes"]
        .replace("_mistakes_", driveErrors.toString())
        .replace("_max_", conf["maxMistakes"].practicalExam.toString()),
    );
    await wait(2000);
    healthDelay = false;
  };
  let lastVehicleHealth = GetEntityHealth(vehicle);
  const checkInterval = setTick(() => {
    if (IsPedInAnyVehicle(player, false)) {
      const vehicle = GetVehiclePedIsIn(player, false);
      const health = GetEntityHealth(vehicle);
      if (health < lastVehicleHealth) {
        if (!healthDelay) {
          makeMistake();
        }
      }
      lastVehicleHealth = GetEntityHealth(vehicle);
    }
  });
  const examInterval = setTick(() => {
    const coords = GetEntityCoords(player, false);
    const nextCheckpoint = currentCheckPoint + 1;
    if (conf["checkPoints"][nextCheckpoint] === undefined) {
      if (DoesBlipExist(currentBlip)) {
        RemoveBlip(currentBlip);
      }

      if (driveErrors <= conf["maxMistakes"].practicalExam) {
        stopExam(true, licenseType, vehicle);
      } else {
        stopExam(false, "", vehicle);
      }
      clearTick(examInterval);
      clearTick(checkInterval);
    } else {
      if (currentCheckPoint !== lastCheckPoint) {
        if (DoesBlipExist(currentBlip)) {
          RemoveBlip(currentBlip);
        }

        currentBlip = AddBlipForCoord(
          conf["checkPoints"][nextCheckpoint].x,
          conf["checkPoints"][nextCheckpoint].y,
          conf["checkPoints"][nextCheckpoint].z,
        );
        SetBlipRoute(currentBlip, true);

        lastCheckPoint = currentCheckPoint;
      }

      const distance = GetDistanceBetweenCoords(
        coords[0],
        coords[1],
        coords[2],
        conf["checkPoints"][nextCheckpoint].x,
        conf["checkPoints"][nextCheckpoint].y,
        conf["checkPoints"][nextCheckpoint].z,
        true,
      );

      if (distance <= conf["markers"].checkPoint.distance.show) {
        DrawMarker(
          conf["markers"].checkPoint.type,
          conf["checkPoints"][nextCheckpoint].x,
          conf["checkPoints"][nextCheckpoint].y,
          conf["checkPoints"][nextCheckpoint].z + conf["markers"].checkPoint.height,
          conf["markers"].checkPoint.direction.x,
          conf["markers"].checkPoint.direction.y,
          conf["markers"].checkPoint.direction.z,
          conf["markers"].checkPoint.rotation.x,
          conf["markers"].checkPoint.rotation.y,
          conf["markers"].checkPoint.rotation.z,
          conf["markers"].checkPoint.scale.x,
          conf["markers"].checkPoint.scale.y,
          conf["markers"].checkPoint.scale.z,
          conf["markers"].checkPoint.color.r,
          conf["markers"].checkPoint.color.g,
          conf["markers"].checkPoint.color.b,
          conf["markers"].checkPoint.alpha,
          conf["markers"].checkPoint.bob,
          conf["markers"].checkPoint.face,
          2,
          false,
          null,
          null,
          false,
        );
      }

      if (distance <= conf["markers"].checkPoint.distance.open && !waitForSync) {
        (async (): Promise<void> => {
          waitForSync = true;
          switch (conf["checkPoints"][nextCheckpoint].type) {
            case "stop_for_passing":
              missionText(lang["checkPoints"].stop_for_passing, 5000);
              PlaySound(-1, "RACE_PLACED", "HUD_AWARDS", false, 0, true);
              FreezeEntityPosition(vehicle, true);
              await wait(6000);
              FreezeEntityPosition(vehicle, false);
              currentCheckPoint++;
              break;
            case "rotate_left":
              missionText(lang["checkPoints"].rotate_left, 5000);
              currentCheckPoint++;
              break;
            case "rotate_right":
              missionText(lang["checkPoints"].rotate_right, 5000);
              currentCheckPoint++;
              break;
            case "rotate_right_sharp":
              missionText(lang["checkPoints"].rotate_right_sharp, 5000);
              currentCheckPoint++;
              break;
            case "go_straight":
              missionText(lang["checkPoints"].go_straight, 5000);
              currentCheckPoint++;
              break;
            case "rotate_to_runway":
              missionText(lang["checkPoints"].rotate_to_runway, 5000);
              currentCheckPoint++;
              break;
            case "rotate_more_to_runway":
              missionText(lang["checkPoints"].rotate_more_to_runway, 5000);
              currentCheckPoint++;
              break;
            case "increase_speed":
              missionText(lang["checkPoints"].increase_speed, 5000);
              currentCheckPoint++;
              break;
            case "increase_speed_more":
              missionText(lang["checkPoints"].increase_speed_more, 5000);
              currentCheckPoint++;
              break;
            case "take_off_and_land":
              missionText(lang["checkPoints"].take_off_and_land, 5000);
              currentCheckPoint++;
              break;
            case "good_landing":
              missionText(lang["checkPoints"].good_landing, 5000);
              currentCheckPoint++;
              break;
            case "rotate_more_right":
              missionText(lang["checkPoints"].rotate_more_right, 5000);
              currentCheckPoint++;
              break;
            case "rotate_more_left":
              missionText(lang["checkPoints"].rotate_more_left, 5000);
              currentCheckPoint++;
              break;
            case "last_point":
              currentCheckPoint++;
              break;
            default:
              error(
                `Checkpoint type "${conf["checkPoints"][nextCheckpoint].type}" is invalid`,
                "config",
              );
          }
          waitForSync = false;
        })();
      }
    }
  });
};

const stopExam = (bool: boolean, license: string, vehicle: number): void => {
  if (bool) {
    notifyText(lang["passed"]);
    emitNet(`gm_${script}:addLicense_${conf["framework"]}`, license);
  } else {
    notifyText(lang["failed"]);
  }
  SetEntityAsMissionEntity(vehicle, true, true);
  DeleteVehicle(vehicle);
};

export { startExam };
