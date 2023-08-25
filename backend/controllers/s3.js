import formidable from "formidable";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import { Transform } from "stream";

// setup S3 configurations
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.S3_REGION;
const Bucket = process.env.S3_BUCKET;

// 파일 업로드 관련
const parsefile = (req) => {
    return new Promise((resolve, reject) => {
        let options = {
            maxFileSize: 100 * 1024 * 1024, // 100 megabytes converted to bytes,
            allowEmptyFiles: false
        };

        const form = formidable(options);

        form.parse(req, (err, fields, files) => {});

        form.on("error", (error) => {
            reject(error.message);
        });

        form.on("data", (data) => {
            if (data.name === "complete") {
                resolve(data.value);
            }
        });

        // Handling the file upload
        form.on("fileBegin", (formName, file) => {
            file.open = async function () {
                this._writeStream = new Transform({
                    transform(chunk, encoding, callback) {
                        callback(null, chunk);
                    }
                });

                this._writeStream.on("error", (e) => {
                    form.emit("error", e);
                });

                console.log("Region2: ", process.env.S3_REGION);

                new Upload({
                    client: new S3Client({
                        credentials: {
                            accessKeyId,
                            secretAccessKey,
                        },
                        region
                    }),
                    params: {
                        ACL: "public-read",
                        Bucket,
                        Key: `${Date.now().toString()}-${this.name}`,
                        Body: this._writeStream
                    },
                    tags: [], // optional tags
                    queueSize: 4, // optional concurrency configuration
                    partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
                    leavePartsOnError: false // optional manually handle dropped parts
                }).done()
                    .then((data) => {
                        const url = `https://${Bucket}.s3.${region}.amazonaws.com/${data.Key}`;
                        form.emit("data", { name: "complete", value: { ...data, url } });
                    })
                    .catch((err) => {
                        form.emit("error", err);
                    });
            };

            file.end = function (cb) {
                this._writeStream.on("finish", () => {
                    this.emit("end");
                    cb();
                });
                this._writeStream.end();
            };
        });
    });
};


exports.s3upload = async (req, res) => {
    try {
        const data = await parsefile(req);
        const url = data.url; // URL of the uploaded file

        res.status(200).json({
            message: "성공",
            url
        });
    } catch (error) {
        res.status(400).json({
            message: "오류가 발생했습니다.",
            error
        });
    }
};