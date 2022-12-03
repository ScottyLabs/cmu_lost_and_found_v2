import { BuildingType } from "../enums/locationTypes";
import { PermissionType } from "../enums/permissionType";
import User, { IUser } from "../models/User";

export default class PermissionsController {
  /**
   * Parse a permission string to get permission info
   * @param permission Permission string
   * @returns A tuple: [Building, Permission]
   */
  public static parsePermission(
    permission: string
  ): [BuildingType, PermissionType] {
    if (!permission) {
      return null;
    }

    const tokens = permission.split(":");

    if (tokens.length !== 2) {
      return null;
    }

    const [bldg, perm] = tokens;
    if (
      !Object.values(BuildingType).includes(bldg as BuildingType) ||
      !Object.values(PermissionType).includes(perm as PermissionType)
    ) {
      return null;
    }

    return [bldg as BuildingType, perm as PermissionType];
  }

  public static async hasPermissions(
    building: BuildingType,
    action: PermissionType,
    username: string
  ): Promise<boolean> {
    try {
      const user = await User.findOneByUsername(username);
      if (
        user.permissions.includes(
          `${String(BuildingType.ALL)}:${String(PermissionType.ADMIN)}`
        ) ||
        user.permissions.includes(
          `${String(building)}:${String(PermissionType.ADMIN)}`
        ) ||
        user.permissions.includes(
          `${String(BuildingType.ALL)}:${String(action)}`
        )
      ) {
        return true;
      }
      return user.permissions.includes(`${String(building)}:${String(action)}`);
    } catch (err) {
      return false;
    }
  }

  public static hasPermissionsWithUser(
    building: BuildingType,
    action: PermissionType,
    user: IUser
  ): boolean {
    console.log(user);
    console.log(user.permissions);
    if (user) {
      if (
        user.permissions.includes(
          `${String(BuildingType.ALL)}:${String(PermissionType.ADMIN)}`
        ) ||
        user.permissions.includes(
          `${String(building)}:${String(PermissionType.ADMIN)}`
        ) ||
        user.permissions.includes(
          `${String(BuildingType.ALL)}:${String(action)}`
        )
      ) {
        return true;
      }
      return user.permissions.includes(`${String(building)}:${String(action)}`);
    }
    return false;
  }
}
