package main

import (
	"github.com/pulumi/pulumi-gcp/sdk/v6/go/gcp/storage"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

type infrastructure struct {
	website *storage.Bucket
}

func createInfrastructure(ctx *pulumi.Context) (*infrastructure, error) {
	websiteBucket, err := storage.NewBucket(ctx, "website", &storage.BucketArgs{
		Cors: storage.BucketCorArray{
			&storage.BucketCorArgs{
				MaxAgeSeconds: pulumi.Int(3600),
				Methods: pulumi.StringArray{
					pulumi.String("GET"),
					pulumi.String("HEAD"),
					pulumi.String("PUT"),
					pulumi.String("POST"),
					pulumi.String("DELETE"),
				},
				ResponseHeaders: pulumi.StringArray{
					pulumi.String("*"),
				},
			},
		},
		ForceDestroy:             pulumi.Bool(true),
		Location:                 pulumi.String("EU"),
		UniformBucketLevelAccess: pulumi.Bool(true),
		Website: &storage.BucketWebsiteArgs{
			MainPageSuffix: pulumi.String("index.html"),
			NotFoundPage:   pulumi.String("index.html"),
		},
	})
	if err != nil {
		return nil, err
	}

	return &infrastructure{
		website: websiteBucket,
	}, nil
}

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		_, err := createInfrastructure(ctx)
		if err != nil {
			return err
		}

		return nil
	})
}
